// We work for both login and signup here
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import "./Login.css";
// import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';
import { UserContext } from 'App';

const Login = () => {
    const [ isNewUser, setIsNewUser ] = useState(false);
    // const [ isUserNameAvailable, setIsUserNameAvailable ] = useState(false);
    // let users = useState([]);
    const [ formInputFields, setFormInputFields ] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        role:"student",
        password: '',
        confirmPassword: ''
    });
    const [ error, setError ] = useState('');
    const [ inputSuccess, setInputSuccess ] = useState('');
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        userName: '',
        password: '',
        email: '',
        role:"student",
        photo: '',
        error: '',
        success: false
    })

    // @ts-ignore
    const {loggedInUserData}= useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    // const history = useHistory();
    // const location = useLocation();
    // let { from } = location.state || { from: { pathname: "/" } };
    initializeLoginFramework();


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }


    // const signOut = () => {
    //     setLoggedInUser({})
    //     // setUser({})
    // }


    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        // sessionStorage.setItem('email',email)
        // if (redirect) {
        //     history.replace(from)
        // }
    }


    const isStartswithAlphabetic = (string) => {
        const char = string.charAt(0)
        return (/[a-zA-Z]/).test(char)
    }

    const isNameValid = (name, value, isFieldValid, min, max) => {
        if ((value.length >= min) && (value.length <= max)) {
            isFieldValid = (/^[a-z ,.'-]+$/i.test(value)) && (isStartswithAlphabetic(value)) ;
            if(isFieldValid){
                setError('')
                return true;
            }
            else{
                setError(`Enter valid ${name} Name`)
                return false;
            }
        }
        else{
            setError(`The length of your ${name} name should be between ${min} and ${max}. It might contain characters, hyphen ans dot`);
            return false;
        }
    }


    const handleChange = (event)=>{
        let isFieldValid = true;
        if (event.target.name === 'first_name') {
            let firstName = event.target.value.trim();
            isFieldValid = isNameValid('First', firstName,  isFieldValid , 2, 10 );
            if(isFieldValid){
                formInputFields.firstName = firstName;
                if (formInputFields.lastName){
                    user.name = formInputFields.firstName + " "+ formInputFields.lastName;
                }
                setInputSuccess('First name updated successfully');
            }
            else{
                setInputSuccess('Please update first name')
            }
        }
        else if (event.target.name === 'last_name') {
            let isFirstNameValid = isNameValid('First', formInputFields.firstName,  isFieldValid , 2, 10 );
            if(isFirstNameValid){
                let lastName = event.target.value.trim();
                isFieldValid = isNameValid('Last', lastName,  isFieldValid , 2, 10 );
                if(isFieldValid){
                    formInputFields.lastName = lastName;
                    user.name = formInputFields.firstName + " "+ formInputFields.lastName;
                    setInputSuccess('Last name updated successfully');
                }
                else{
                    setInputSuccess('Please update last name')
                }
            }
            else{
                setError('Please enter first name before enter lastname')
                event.target.value='';
            }
        }
        else if (event.target.name === 'user_name') {
            let isLastNameValid = isNameValid('First', formInputFields.lastName,  isFieldValid , 2, 10 );
            if (isLastNameValid){
                console.log(0)
                let userName = event.target.value.trim();
                isFieldValid = isNameValid('User', userName,  isFieldValid , 2, 10 );
                if(isFieldValid){
                    formInputFields.userName = userName;
                    user.userName = formInputFields.userName ;
                    setInputSuccess('User name updated successfully');
                }
                else{
                    setInputSuccess('Please update user name')
                }
            }
            else{
                event.target.value='';
                setError('Please enter first name and last name before enter user name')
            }
        }
        else if (event.target.name === 'role'){
            formInputFields.role= event.target.value;
            console.log(formInputFields,'ok')
        }
        else if (event.target.name === 'email') {
            // for sign up
            if (isNewUser) {
                if (formInputFields.userName) {
                    isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
                    if (isFieldValid) {
                        setError('')
                        formInputFields.email = event.target.value;
                        user.email = event.target.value;
                    }
                    else {
                        setError('Please Enter a valid email')
                    }
                }
                else {
                    setError('Please enter a valid first name, last name and user name before enter email')
                    event.target.value='';
                }
            }
            // for sign in
            else {
                isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
                if (isFieldValid) {
                    setError('')
                    formInputFields.email = event.target.value;
                }
                else {
                    setError('Please Enter a valid email')
                }
            }
        }

        else if (event.target.name === 'password') {
            if (formInputFields.email) {
                if (event.target.value.length > 6 && event.target.value.length < 50) {
                    isFieldValid = /\d{1}/.test(event.target.value);
                    if (isFieldValid) {
                        setError('')
                        formInputFields.password = event.target.value;
                    }
                    else {
                        setError('Your password should contain at least one number')
                    }
                }
                else {
                    setError('The length of your password should be between 7 and 49')
                }
            }
            else {
                setError('Please enter email proprtly before enter password')
                event.target.value='';
            }
        }

        else if (event.target.name === 'password') {
            if (formInputFields.email) {
                if (event.target.value.length > 6 && event.target.value.length < 50) {
                    isFieldValid = /\d{1}/.test(event.target.value);
                    if (isFieldValid) {
                        setError('')
                        formInputFields.password = event.target.value;
                    }
                    else {
                        setError('Your password should contain at least one number')
                    }
                }
                else {
                    setError('The length of your password should be between 7 and 49')
                }
            }
            else {
                setError('Please enter name and email proprtly before enter password')
                event.target.value='';
            }
        }
        else if (event.target.name === 'confirm_password') {
            if (formInputFields.password) {
                formInputFields.confirmPassword = event.target.value;
                if (formInputFields.password === formInputFields.confirmPassword) {
                    const newUserInfo = { ...user }
                    newUserInfo.name = formInputFields.firstName + ' ' + formInputFields.lastName;
                    newUserInfo.userName = formInputFields.userName;
                    newUserInfo.email = formInputFields.email;
                    newUserInfo.password = formInputFields.password;
                    newUserInfo.role = formInputFields.role;
                    setUser(newUserInfo);
                    setError('')
                }
                else {
                    setError('Confirm Password is not matching with password')
                }
            }
            else {
                setError('Please fill previous fields before enter password')
                event.target.value='';
            }
        }

        else if (event.target.name === 'role') {
            formInputFields.role = event.target.value;
            user.role = event.target.value;
        }
        // Only for sign in
        if (event.target.name === 'password') {
            if (!isNewUser && isFieldValid) {
                const newUserInfo = { ...user }
                newUserInfo.email = formInputFields.email;
                newUserInfo.password = formInputFields.password;
                setUser(newUserInfo);
            }
        }
    }
    const handleBlur = (event)=>{
        console.log(event.target.name, event.target.value);
        fetch("http://localhost:4000/isUserNameExist", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userName: event.target.value }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data){
                    setError(`Username '${ event.target.value}' is exist, please Use another one`);
                    setInputSuccess('');
                    formInputFields.userName='';
                    event.target.value='';
                    // console.log( true);
                }else{
                    // console.log( false);
                }
            })
            .catch((error) => {
            console.error(error);
            });
        // alert('we are checking whether your username is available or not');
    }
    const handleFormSubmit = (event)=>{
        event.preventDefault();
        console.log(user);
        if (isNewUser && user.email && user.password && user.userName && user.role) {
            //have to save database
            createUserWithEmailAndPassword(user.name, user.email, user.password, user.userName, user.role)
                .then(res => {
                    if(res.success === false){
                        alert('This email address is already used by another account')
                    }
                    else{
                        handleResponse(res, true)
                        sessionStorage.setItem('email',res.email)
                    }
                })
        }
        if (!isNewUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res,'line 281')
                    if(res.success === false){
                        // setCheck('UserName or Password is not matching')
                        // console.log(res.success, check)
                        setError('UserName or Password is not matching')
                    }else{
                        //have to send user data to database
                        sessionStorage.setItem('email',res.email)
                        handleResponse(res, true)
                    }
                })
        }
    }

    return (
        <div className="login-wraper">
            
            <div className="container-85 row">
                <div className="col-md-4 error-check">
                    <p>Errors - Suggession - Success: </p>
                    <p>{error}</p>
                    <p>{inputSuccess}</p>
                </div>
                <div className="col-md-8">
                    <div className="login">
                        <div className="login-form">
                            <form className='form' onSubmit={handleFormSubmit}>
                                <input onChange={() => setIsNewUser(!isNewUser)} type="checkbox" name="isNewUser" id="isNewUser" />
                                <label htmlFor="isNewUser" className="login-select">
                                <label htmlFor="isNewUser"><span className="new-user"></span>New User Sign Up</label>
                                </label> <br />
                                {
                                    isNewUser && 
                                    <>
                                        <label className='text-left' htmlFor="first_name">First Name: </label>
                                        <input onChange={handleChange} type="text" id="first_name" name="first_name" placeholder="Enter Your First Name.."></input>
                                        <label className='text-left' htmlFor="last_name">Last Name: </label>
                                        <input onChange={handleChange} type="text" id="last_name" name="last_name" placeholder="Enter Your Last Name.."></input>
                                        <label className='text-left' htmlFor="user_name">User Name: </label>
                                        <input onChange={handleChange} onBlur={handleBlur} type="text" id="user_name" name="user_name" placeholder="Enter Your User Name.."></input>
                                        <label htmlFor="cars">Select Your Role:</label>
                                        <select onChange={handleChange} name="role" id="role">
                                            <option value="student">Student</option>
                                            <option value="teacher">Teacher</option>
                                        </select>
                                        <br />
                                    </>
                                }
                                <label className='text-left' htmlFor="email">Email: </label>
                                <input onChange={handleChange} type="email" id="email" name="email" placeholder="Enter Your Email.."></input>
                                <label className='text-left' htmlFor="password">Password: </label>
                                <input onChange={handleChange} type="password" id="passworde" name="password" placeholder="Enter Your Password.."></input>
                                {
                                    isNewUser && 
                                    <>
                                        <label className='text-left' htmlFor="confirm_password">Confirm Password: </label>
                                        <input onChange={handleChange} type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password.."></input>
                                    </>
                                }
                                <input type="submit" value={isNewUser ? 'Sign Up' : 'Sign In'}></input>
                            </form>
                            <h4 className='div'>-----------Or-----------</h4>
                            <div className="social-media">
                                <button onClick={googleSignIn} className='google btn'><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> Sign In With Google (as student)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Login;