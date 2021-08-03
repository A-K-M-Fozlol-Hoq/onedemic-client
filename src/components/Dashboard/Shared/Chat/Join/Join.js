import { UserContext } from "App";
import CourseCard from "components/Dashboard/Utilities/CourseCard/CourseCard";
import React, { useContext, useState } from "react";
import Chat from "../Chat/Chat";
import "./Join.css";

const Join = () => {
	// @ts-ignore
	const { loggedInUserData,courseInfo } = useContext(UserContext); 
	const [loggedInUser, setLoggedInUser] = loggedInUserData;
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [courseName, setCourseName] = useState("");
	const [showCards, setShowCards] = useState(true);
	const handleBack =()=>{
	  setShowCards(true);
  	  setCourseName('demoCourse')
	}
	const enterChat =(courseName)=>{
		setShowCards(false);
		setCourseName(courseName)
	}

	return (
		// <div className="join">
		// 	<div className="join-form">
		// 		<input placeholder="name" onChange={(e) => setName(e.target.value)} />
		// 		<input placeholder="room" onChange={(e) => setRoom(e.target.value)} />
		// 		<Chat to={`/chat?name=${name}&room=${room}`}>Join</Chat>
		// 	</div>
		// </div>
		


		<div className="manage-students-wrapper">
      {showCards ? (
        <div className="cards row">
        {
          // @ts-ignore
          loggedInUser.courses?.map((course) => (
          <CourseCard enterChat={enterChat} className='col-md-4' course={course} key={course.courseCode}></CourseCard>
          ))
        }
      </div>
      ) : (
        <div>
          <p onClick={handleBack } className='text-danger bg-warning m-2 p-2 rounded' style={{width:'80px', cursor: 'pointer'}}><b>&larr;</b> BACK</p><br /><br />
          <div>
			  <Chat name={loggedInUser.name} room={courseName}></Chat>
            </div>
        </div>
      )}
      
    </div>
	);
};

export default Join;