import { UserContext } from "App";
import CourseCard from "components/Dashboard/Utilities/CourseCard/CourseCard";
import React, { useContext, useState } from "react";
import "./ManageCourse.css";

const ManageCourse = () => {
  const [courseCode, setCourseCode] = useState("");;
  const [ joiningCourse, setJoiningCourse ]= useState(false);
  // @ts-ignore
  const { loggedInUserData } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = loggedInUserData;
  // const [courses, setCourses] = coursesData;
  const email = sessionStorage.getItem("email")

  const handleSubit = (e) => {
    e.preventDefault();
    if (courseCode) {
      setJoiningCourse(true);
      fetch("http://localhost:4000/joinCourse", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // "Accept": "application/json",
        },
        body: JSON.stringify({
          courseCode: courseCode,
          email,
          name: loggedInUser.name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setJoiningCourse(false);
          alert(data.msg);
          // console.log(data.msg);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please enter course code");
    }
  };
  const handleChange = (event) => {
    setCourseCode(event.target.value);
  };
  return (
    <div className="manage-course-wrapper">
      <div className="manage-course row">
        <div className="col-md-5 col-5-card col-5-card-hover existing-course">
          <h2>Enrolled Courses</h2>
          {
            // @ts-ignore
            loggedInUser.courses?.map((course) => (
              <CourseCard course={course} key={course.courseCode}></CourseCard>
            ))
          }
          <br />
        </div>
        <div className="col-md-5 col-5-card col-5-card-hover new-course">
          <h2 className="mb-5">Enroll New Course:</h2>
          <form className="p-5" onSubmit={handleSubit}>
            <p className='m-2'>Join New Course: </p>
            <input className="form-control m-2" placeholder="Ente Course Code" name="course-code" onChange={handleChange} type="text"/>
            {/* <input type="submit" className="m-2 btn btn-primary" value="Join Course" /> */}
            {
              joiningCourse?
              <div className="m-2">
                <input type="submit" className="m-2 btn btn-primary d-none" value="Join Course" />
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="bg-warning text-success p-2 rounded">Joining Course...</p>
              </div>
              :
              <input type="submit" className="m-2 btn btn-primary" value="Join Course" />
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
