import { UserContext } from "App";
import CourseCard from "components/Dashboard/Utilities/CourseCard/CourseCard";
import React, { useContext, useState } from "react";
import "./CreateCourse.css";

const CreateCourse = () => {
  const email = sessionStorage.getItem("email");
  // @ts-ignore
  const {loggedInUserData}= useContext(UserContext); 
  const [loggedInUser, setLoggedInUser] = loggedInUserData;
  const [ error, setError ]= useState('')
  const [ showButton, setShowButton ]= useState(false)
  const [newCourseData, setNewCourseData] = useState({
    courseName: "",
    courseCode: "",
    coursePhoto: "",
  });
  
  const onBlur = (event) => {
    setError('Checking Courde Code')
    fetch("http://localhost:4000/isCourseCodeExist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ courseCode: newCourseData.courseCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === true) {
            setShowButton(true);
            setError('This code is used by another account');
            event.target.value='';
            newCourseData.courseCode = '';
          }
           else {
            setError("Course Code Available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };
  const handleSubit = (e) => {
    e.preventDefault();
    if (
      newCourseData.courseName &&
      newCourseData.courseCode &&
      newCourseData.coursePhoto
    ) {
      if (newCourseData.courseName.trim().length > 2) {
        if (newCourseData.courseCode.trim().length === 6) {
          console.log("COntinue");
          const formData = new FormData();
          formData.append("file", newCourseData.coursePhoto);
          formData.append("courseName", newCourseData.courseName);
          formData.append("courseCode", newCourseData.courseCode);
          formData.append("email", email);

          fetch("http://localhost:4000/createCourse", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          alert("The length of course code will be 6");
          setError("The length of your course code will be 6");
        }
      } else {
        alert("The length of course name will be more than 2");
      }
    } else {
      alert("Please Provide All data properly");
    }
  };
  const handleChange = (event) => {
    if (event.target.name === "course-name") {
      newCourseData.courseName = event.target.value.trim();
    } else {
      newCourseData.courseCode = event.target.value.trim();
      setError('')
    }
  };
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    newCourseData.coursePhoto = newFile;
    console.log(newCourseData);
  };
  return (
    <div className="create-course-wrapper">
      <div className="create-course row">
        <div className="col-md-5 col-5-card col-5-card-hover existing-course">
          <h2>Existing Courses</h2><br />
          {/* <div className="m-auto "> */}
          {
            // @ts-ignore
            loggedInUser.courses.map(course =><CourseCard course={course} key={course.courseCode}></CourseCard>)
          }
          {/* </div> */}
        </div>
        <div className="col-md-5 col-5-card col-5-card-hover new-course">
          <h2 className="mb-5">Create New Course:</h2>
          <form className="p-5" onSubmit={handleSubit}>
            <input className="form-control m-2" placeholder="Enter Your Course Name" name="course-name" onChange={handleChange} type="text"/>
            <input className="form-control m-2" placeholder="Enter 6 char Course Code" name="course-code" onBlur={onBlur} onChange={handleChange} type="text"/>
            {
            error&& 
            <p className="m-2 p-2 bg-primary text-white rounded">{error} <br></br>
            {
              showButton &&
              <button onClick={()=>{setError('');setShowButton(false)}} className='btn btn-danger'>ok</button>
            }
             
            </p> 
            }
            <label className='text-left m-2' htmlFor="course-photo">Course Cover Photo: </label>
            <input className="form-control m-2"name='course-photo' type="file" onChange={handleFileChange}/>
            <input type="submit" className="m-2 btn btn-primary" value="Create Course" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
