import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faObjectGroup, faStream, faChartPie, faHeadset } from "@fortawesome/free-solid-svg-icons";
// import { faUserCircle } from "@fortawesome/free-brands-svg-icons"
import "./StudentDashboard.css";
// fake img
// @ts-ignore
import profilePicture from '../../../../images/longLogo.PNG';
import ManageProfile from "components/Dashboard/Shared/ManageProfile/ManageProfile";
import ManageCourse from "../ManageCourse/ManageCourse";
import Join from "components/Dashboard/Shared/Chat/Join/Join";

const StudentDashboard = ( props ) => {
  const { name, profile } = props;
  const [viewComponent, setviewComponent] = useState("manageCourse");
  return (
    <div>
      <div className="student-dashboard">
        <div className="dashboard-header">
          <h1>Student dashboard</h1>
        </div>
        <div className="dashboard-functionality">
          <div className="sidebar">
            <div className="profile-pic-div">
              {
                profile?
                <img src={profile} alt=''></img>
                :
                <img src={profilePicture} alt="profilePicture" />
              }
            </div>
            <h5 className="user-name">name: {name}</h5>
            <ul>
              <li onClick={() => setviewComponent("manageProfile")}>
                <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon> Manage
                Profile
              </li>
              <li onClick={() => setviewComponent("manageCourse")}>
              <FontAwesomeIcon icon={faObjectGroup}></FontAwesomeIcon> Manage Course
              </li>
              <li onClick={() => setviewComponent("marksheet")}> <FontAwesomeIcon icon={faChartPie}></FontAwesomeIcon> Marksheet</li>
              <li onClick={() => setviewComponent("upcomingExam")}>
              <FontAwesomeIcon icon={faStream}></FontAwesomeIcon> Upcoming Exam
              </li>
              <li onClick={() => setviewComponent("chat")}><FontAwesomeIcon icon={faHeadset}></FontAwesomeIcon> Chat</li>
            </ul>
          </div>
          <div className="functionality">
            {viewComponent === "manageProfile" ? <ManageProfile></ManageProfile> : <></>}
            {viewComponent === "manageCourse" ? <ManageCourse></ManageCourse> : <></>}
            {viewComponent === "marksheet" ? <p>marksheet</p> : <></>}
            {viewComponent === "upcomingExam" ? <p>upcomingExam</p> : <></>}
            {viewComponent === "chat" ? <Join></Join> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
