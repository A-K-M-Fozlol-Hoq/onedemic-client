import React, { createContext, useState } from "react";
import Home from "components/Home/Home/Home";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NotFound from "components/NotFound/NotFound";
import Login from "components/Login/Login/Login";
import PrivateRoute from "components/Login/PrivateRoute/PrivateRoute";
import Dashboard from "components/Dashboard/Dashboard/Dashboard";
import Navbar from "components/Shared/Navbar/Navbar";
import Footer from "components/Shared/Footer/Footer";

export const UserContext = createContext([]);
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({}); 
  const [courseData, setCourseData] = useState({}); 
  // const signOut = ()=>{
  //   setLoggedInUser({})
  // }
  return (
    // @ts-ignore
    <UserContext.Provider value={{ loggedInUserData: [loggedInUser, setLoggedInUser], courseInfo: [courseData, setCourseData] }}>
    <Router>
      <Navbar></Navbar>
      <Switch>

        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route path="/home">
          <Home></Home>
        </Route>

        <Route path="/login">
          <Login></Login>
        </Route>
        
        <PrivateRoute path="/dashboard">
          <Dashboard></Dashboard>
        </PrivateRoute>

        <Route path="*">
          <NotFound></NotFound>
        </Route>
        
      </Switch>
      <Footer></Footer>
    </Router>
    </UserContext.Provider>
  );
};

export default App;
