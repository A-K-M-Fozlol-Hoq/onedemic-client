import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faObjectGroup, faStream, faChartPie, faTasks, faHeadset } from "@fortawesome/free-solid-svg-icons";
import "./TeachersDashboard.css";
// faeke profile, have to delete
// @ts-ignore
import profilePicture from '../../../../images/longLogo.PNG'
import ManageProfile from "components/Dashboard/Shared/ManageProfile/ManageProfile";
import CreateCourse from "../CreateCourse/CreateCourse";
import CreateExam from "../CreateExam/CreateExam";
import ManageStudents from "../ManageStudents/ManageStudents";

const TeachersDashboard = ( props ) => {
  const { name, profile } = props;
  const [ viewComponent, setviewComponent] = useState('manageStudents')
  return (
    <div>
      <div className="teacher-dashboard">
        <div className="dashboard-header">
          <h1>Teachers dashboard</h1>
        </div>
        <div className="dashboard-functionality row">
          <div className="sidebar">
          <div className="profile-pic-div">
            {
              profile?
              <img src={profile} alt=''></img>
              :
              <img src={profilePicture} alt="profilePicture" />
            }
              
            </div>
            <h5 className="user-name">{name}</h5>
            <ul>
              <li onClick={() => setviewComponent('manageProfile')}><FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>Manage Profile</li>
              <li onClick={() => setviewComponent('createCourse')}><FontAwesomeIcon icon={faObjectGroup}></FontAwesomeIcon>Create Course</li>
              <li onClick={() => setviewComponent('createExam')}><FontAwesomeIcon icon={faStream}></FontAwesomeIcon>Create Exam</li>
              <li onClick={() => setviewComponent('viewAllResults')}><FontAwesomeIcon icon={faChartPie}></FontAwesomeIcon>View All Results</li>
              <li onClick={() => setviewComponent('manageStudents')}><FontAwesomeIcon icon={faTasks}></FontAwesomeIcon>Manage Students</li>
              <li onClick={() => setviewComponent('chat')}><FontAwesomeIcon icon={faHeadset}></FontAwesomeIcon>Chat</li>
            </ul>
          </div>
          <div className="functionality">
          {
            viewComponent === 'manageProfile'?
            <ManageProfile></ManageProfile>:<></>
          }
          {
            viewComponent === 'createCourse'?
            <CreateCourse></CreateCourse> :<></>
          }
          {
            viewComponent === 'createExam'?
            <CreateExam></CreateExam>:<></>
          }
          {
            viewComponent === 'viewAllResults'?
            <p>viewAllResults</p>:<></>
          }
          {
            viewComponent === 'manageStudents'?
            <ManageStudents></ManageStudents>:<></>
          }
          {
            viewComponent === 'chat'?
            <p>chat</p>:<></>
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersDashboard;
