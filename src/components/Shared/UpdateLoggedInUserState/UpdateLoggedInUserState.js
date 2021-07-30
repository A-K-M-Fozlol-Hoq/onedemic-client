import { UserContext } from 'App';
import React, { useContext, useEffect } from 'react';

const UpdateLoggedInUserState = () => {
    // @ts-ignore
    const {loggedInUserData}= useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    const email =sessionStorage.getItem('email');
    console.log(email,'UpdateLoggedInUserState')
    useEffect(()=>{
        fetch('http://localhost:4000/getFullUserByEmail', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({email:email })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data[0],'UpdateLoggedInUserState --start')
                setLoggedInUser(data[0])
                console.log(loggedInUser,'UpdateLoggedInUserState --end')
            })
            .catch(error => {
                console.error(error)
            })
    },[email])

    return (
        <div>
            
        </div>
    );
};

export default UpdateLoggedInUserState;