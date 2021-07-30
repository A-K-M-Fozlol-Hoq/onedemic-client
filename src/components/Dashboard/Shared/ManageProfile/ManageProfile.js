import React, { useContext, useState } from "react";
import "./ManageProfile.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "App";

const customStyles = {
  content: {
    background: "#0d6efd",
    border: "2px solid goldenrod",
    borderRadius: "15px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const buttonDesign = {
  padding: "5px",
  margin: "5px 0",
  width: "100%",
};
Modal.setAppElement("#root");

const ManageProfile = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [profilemodalIsOpen, setProfileIsOpen] = useState(false);
  const [error, setError] = useState(" ");
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [updating, setUpdating] = useState(false);
  const [close, setClose] = useState(true);
  // @ts-ignore
  const {loggedInUserData}= useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = loggedInUserData;
  const email = sessionStorage.getItem("email");


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setIsUserNameAvailable(false);
    setUserNameInput("");
    setError(" ");
  }

  function openProfileModal() {
    setProfileIsOpen(true);
  }

  function closeProfileModal() {
    setProfileIsOpen(false);
    setProfilePicture("");
  }

  const handleUsernameUpdate = (event) => {
    event.preventDefault();
    setIsUserNameAvailable(false);
    setError(" "); 
    fetch("http://localhost:4000/updateUserName", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userName: userNameInput, email: email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.matchedCount === 1) {
              setUpdating(false);
              setClose(true);
              closeModal();
            }
          })
          .catch((error) => {
            console.error(error);
          });
    setUserNameInput("");
  };

  const isStartswithAlphabetic = (string) => {
    const char = string.charAt(0);
    return /[a-zA-Z]/.test(char);
  };

  const handleChange = (event) => {
    let userName = event.target.value.trim();
    let isFieldValid = true;
    if (userName.length >= 5 && userName.length <= 25) {
      isFieldValid = /^[a-z ,.'-]+$/i.test(userName) && isStartswithAlphabetic(userName);
      if (isFieldValid) {
        setError("");
      } else {
        setError("Enter valid User Name. - Admin");
        return false;
      }
    } else {
      setError(
        `The length of your user name should be between 5 and 25. It might contain characters, hyphen ans dot. - Admin`
      );
      return false;
    }
    setUserNameInput(event.target.value);
    setIsUserNameAvailable(false);
  };

  const checkAvailability = (userName) => {
    if (error === "") {
      setError("Wait a moment");
      fetch("http://localhost:4000/isUserNameExist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userName: userName }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === true) {
            setError("User name is not available. - Admin");
            setIsUserNameAvailable(false);
          } else {
            setError("User name is available. - Admin");
            setIsUserNameAvailable(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("Enter valid username first!");
    }
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setProfilePicture(newFile);
  };

  const handleProfileUpdateFail = () =>{
    setUpdating(false);
    setClose(true);
    closeProfileModal();
    alert('Profile is not updated due to network problem or server side error')
  }
  const handleProfileUpdate = (event) => {
    event.preventDefault();
    setUpdating(true);
    setClose(false);
    const profileData = new FormData();
    profileData.set("key", "b33c215182400d63985c1c33c5ecf50d");
    profileData.append("image", profilePicture);
    axios
      .post("https://api.imgbb.com/1/upload", profileData)
      .then(function (response) {
        const profile = response.data.data.display_url;
        // loggedInUser.profile = profile;
        setLoggedInUser({ profile: profile });

        fetch("http://localhost:4000/updateProfile", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ profile: profile, email: email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.modifiedCount === 1) {
              setUpdating(false);
              setClose(true);
              closeProfileModal();
            }
          })
          .catch((error) => {
            console.error(error);
            handleProfileUpdateFail();
          });
          
      })
      .catch(function (error) {
        console.log(error);
        handleProfileUpdateFail();
      });
    setProfilePicture("");
  };


  return (
    <div className="manage-profile">
      <button className="btn btn-primary" onClick={openModal}>
        Edit Username
      </button>{" "}
      <br />
      <br />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-center text-white">Update User Name </h2>
        <form className="p-5" onSubmit={handleUsernameUpdate}>
          <input className="form-control" placeholder="Enter your username" onChange={handleChange} type="text" />
          {error === "" ? (
            <Link to="/dashboard" style={buttonDesign} className="btn btn-info" onClick={() => checkAvailability(userNameInput)}>
              Check Availability
            </Link>
          ) : (
            <></>
          )}
          <br />
          {error && (
            <p className="text-danger bg-white p-2 rounded">{error}</p>
          )}

          {isUserNameAvailable ? (
            <input type="submit" className="btn btn-success" value="Update" />
          ) : (
            <input disabled type="submit" value="Update" />
          )}
        </form>
        {close ? (
          <button className="btn btn-warning" onClick={closeModal}>close</button>
        ) : (
          <button disabled className="btn btn-warning" onClick={closeModal}>close</button>
        )}
      </Modal>
      <button className="btn btn-primary" onClick={openProfileModal}>Update Profile Picture</button>
      <Modal
        isOpen={profilemodalIsOpen}
        onRequestClose={closeProfileModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-center text-white mb-2">Update Profile Picture </h2>
        <form onSubmit={handleProfileUpdate}>
          <input className="form-control" type="file" onChange={handleFileChange}/> <br />
          {profilePicture === "" ? (
            <input disabled type="submit" className="mb-3" value="Update" />
          ) : (
            <input className="btn btn-success mb-3" type="submit" value="Update"/>
          )}
        </form>
        {updating && (
          <>
            <p>updating...</p>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <br />
          </>
        )}
        {close ? (
          <button className="btn btn-warning" onClick={closeProfileModal}>close</button>
        ) : (
          <button disabled className="btn btn-warning" onClick={closeProfileModal}>close</button>
        )}
      </Modal>
    </div>
  );
};

export default ManageProfile;
