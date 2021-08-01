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
  const [a , setA]= useState({})
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
            console.log(data[0],'line26-data[o]')
            // courseData.data = {...data[0]};
            setCourseData(data[0]) //ITs not working, I don't know why
            // setCourseData(courseData.data) // It's also not working
            console.log(courseData,'line30-courseData')
            console.log(data[0],'line231-data[o]')
        })
        .catch(error => {
            console.error(error)
        })
},[courseCode])

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
          <p onClick={()=>{setShowCards(true)}} className='text-danger bg-warning m-2 p-2 rounded' style={{width:'80px', cursor: 'pointer'}}><b>&larr;</b> BACK</p><br /><br />
          {/* {
            courseData.students?
            <div>
              <ManageStudentsTable course={courseData}></ManageStudentsTable>
            </div>
            :
            <></>
          } */}
        </div>
      )}
      
    </div>
  );
};

export default ManageStudents;
