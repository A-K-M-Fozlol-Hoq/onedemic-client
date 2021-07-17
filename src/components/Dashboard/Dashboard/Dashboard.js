import { UserContext } from 'App';
import UpdateLoggedInUserState from 'components/Shared/UpdateLoggedInUserState/UpdateLoggedInUserState';
import React, { useContext } from 'react';
import StudentDashboard from '../StudentDashboard/StudentDashboard/StudentDashboard';
import TeachersDashboard from '../TeachersDashboard/TeachersDashboard/TeachersDashboard';
import "./Dashboard.css";

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
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
                <TeachersDashboard name={loggedInUser.name}></TeachersDashboard>
                : 
                <StudentDashboard name={loggedInUser.name}></StudentDashboard>
            }
        </div>
    );
};

export default Dashboard;