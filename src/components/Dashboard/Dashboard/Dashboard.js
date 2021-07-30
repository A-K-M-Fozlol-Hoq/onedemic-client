import { UserContext } from 'App';
import UpdateLoggedInUserState from 'components/Shared/UpdateLoggedInUserState/UpdateLoggedInUserState';
import React, { useContext } from 'react';
import StudentDashboard from '../StudentDashboard/StudentDashboard/StudentDashboard';
import TeachersDashboard from '../TeachersDashboard/TeachersDashboard/TeachersDashboard';
import "./Dashboard.css";

const Dashboard = () => {
    // @ts-ignore
    const {loggedInUserData}= useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    return (
        <div>
            {/* <UpdateLoggedInUserState></UpdateLoggedInUserState> */}
            {
                loggedInUser.email || loggedInUser.role || loggedInUser.name ?
                <></>
                :
                <UpdateLoggedInUserState></UpdateLoggedInUserState>
            }
            {
                loggedInUser.role ==='teacher'?
                <TeachersDashboard name={loggedInUser.name} profile={loggedInUser.profile}></TeachersDashboard>
                : 
                <StudentDashboard name={loggedInUser.name} profile={loggedInUser.profile}></StudentDashboard>
            }
        </div>
    );
};

export default Dashboard;