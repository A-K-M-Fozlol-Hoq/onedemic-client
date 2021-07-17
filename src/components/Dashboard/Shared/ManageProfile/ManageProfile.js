import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./ManageProfile.css";

const ManageProfile = () => {
  const { register, handleSubmit } = useForm();
  const [ error, setError ] = useState('');
  const onSubmit = (data) =>{
    fetch('http://localhost:4000/isUserNameExist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userName:data})
    })
        .then(response => response.json())
        .then(data => {
            console.log(data,'ok')
        })
        .catch(error => {
            console.error(error)
        })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* <label className='text-left' htmlFor="user_name">User Name: </label>
        <input onChange={handleChange} onBlur={handleBlur} type="text" id="user_name" name="user_name" placeholder="Enter Your User Name.."></input> */}
         <label htmlFor="userName">Update User Name: </label>                               
        <input {...register("userName", { required: true, minLength: 2,maxLength: 20 })} />
        <input type="submit" value="Update"/>
      </form>
      <p className="text-danger">{error}ok</p>
    </div>
  );
};

export default ManageProfile;
