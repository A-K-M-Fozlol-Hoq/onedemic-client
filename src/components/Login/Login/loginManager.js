import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
// firebase.initializeApp(firebaseConfig);
export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                success: true
            }
            console.log(res)
            // have to save database
            setUserToken( email );
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}


const setUserToken= ( email )=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        sessionStorage.setItem('token',idToken)
        sessionStorage.setItem('email',email) // added by developer of onedemic
      }).catch(function(error) {
        // Handle error
      });
}
// const handleSignOut = () => {
//     return firebase.auth().signOut()
//         .then(res => {
//             const signOutUser = {
//                 isSignedIn: false,
//                 name: '',
//                 email: '',
//                 photo: ''
//             }
//             return signOutUser;
//         })
//         .catch(err => {

//         })
// }


export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const {  displayName, email } = res.user;
            console.log(res.user)
            // console.log(res.user.email,'-------email 80')
            // console.log(res.user.displayName,'----------name 81 line')
            const newUserInfo = {
                isSignedIn: true,
                // name: name,
                name: displayName,
                email: email,
                success: true,
                error:''
            }
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            var errorMessage = error.message;
            const newUserInfo = {}
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
}


export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const {   email, displayName } = res.user;
            const newUserInfo = {
                isSignedIn: true,
                name: displayName,
                email: email,
                success: true,
                error:''
            }
            return newUserInfo;
        })
        .catch((error) => {
            var errorMessage = error.message;
            const newUserInfo = {}
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
}


const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    })
        .then(function () {
            console.log('UsserName Updated Successfully')
        }).catch(function (error) {
            console.log(error)
        });
}