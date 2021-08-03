import { UserContext } from "App";
import CourseCard from "components/Dashboard/Utilities/CourseCard/CourseCard";
import React, { useContext, useEffect, useState } from "react";
import "./ManageStudents.css";
import ManageStudentsTable from "./ManageStudentsTable";


const ManageStudents = () => {
  // @ts-ignore
  const { loggedInUserData,courseInfo } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = loggedInUserData;
  const [courseData, setCourseData]= courseInfo;
  const [showCards, setShowCards] = useState(true);
  const [courseCode, setCourseCode] = useState('demoCourse');
  const manageStudents = ( courseCode ) => {
    setShowCards(false);
    setCourseCode(courseCode)
  };
  useEffect(()=>{
    fetch('http://localhost:4000/getFullCourseByCourseCode', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({courseCode:courseCode })
    })
        .then(response => response.json())
        .then(data => {
            setCourseData(data[0])
        })
        .catch(error => {
            console.error(error)
        })
},[courseCode])

const handleBack =()=>{
  setShowCards(true);
  setCourseCode('demoCourse')
}

const deleteStudent =(courseCode,email)=>{
  console.log(courseCode,email)
  const haveToBlock = window.confirm(`Do you want to block ${email} from the course permanently? If you block him, he will not able to join this course later.`);
  fetch("http://localhost:4000/removeStudentsFromCourse", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ courseCode: courseCode, email: email, haveToBlock:haveToBlock }),
   })
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
    if(haveToBlock){
      alert(`Successfully blocked ${email}  from the course`);
    }else{
      alert(`Successfully removed ${email}  from the course`);
    }
     
   })
  .catch((error) => {console.error(error);});
}

  return (
    <div className="manage-students-wrapper">
      {showCards ? (
        <div className="cards row">
        {
          // @ts-ignore
          loggedInUser.courses?.map((course) => (
          <CourseCard manageStudents={manageStudents} className='col-md-4' course={course} key={course.courseCode}></CourseCard>
          ))
        }
      </div>
      ) : (
        <div>
          <p onClick={handleBack } className='text-danger bg-warning m-2 p-2 rounded' style={{width:'80px', cursor: 'pointer'}}><b>&larr;</b> BACK</p><br /><br />
          <div>
              <ManageStudentsTable deleteStudent={deleteStudent} course={courseData}></ManageStudentsTable>
            </div>
        </div>
      )}
      
    </div>
  );
};

export default ManageStudents;
