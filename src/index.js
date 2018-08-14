import React from 'react'
import ReactDOM from 'react-dom'
import {Routes} from './Routes/Routes'
import {Footer} from './components/Footer/Footer'
import './scss/style.scss'
import {
    BottomNavigation,
    Grid,
    Cell
} from 'react-md';
import firebase from 'firebase';
import { store } from "./store";
import {setAuth, setBio, setProfileImage, setUsername} from "./actions/index";
import {Login} from './Pages/Login/Login'

const config = {
    apiKey: 'AIzaSyCMCsGc-foyjeiknZt9Nw5Sh8NrC2azZUg',
    authDomain: 'tess-36c94.firebaseapp.com',
    databaseURL: 'https://tess-36c94.firebaseio.com',
    projectId: 'tess-36c94',
    storageBucket: 'tess-36c94.appspot.com',
    messagingSenderId: '1071246914359'

};

firebase.initializeApp(config);

// check if logged in & get user's profile info
const {currentUser} = firebase.auth();
if(currentUser > 0){
    console.log("Logged in");
    store.dispatch(setAuth('', '', true, currentUser.uid, '', false));
    firebase.database().ref(`/users/${currentUser.uid}/username`).orderByChild("username").once("value", function(snap) {
        if(snap.val()){
            store.dispatch(setUsername(snap.val().username));
        }
        else {
            store.dispatch(setUsername("..."));
        }
    });
    firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").once("value", function(snap) {
        if(snap.val()){
            store.dispatch(setBio(snap.val().bio));
        }
        else {
            store.dispatch(setBio("Tell others about yourself"));
        }
    });
    firebase.database().ref(`users/${currentUser.uid}/profileImage`).once("value", function (snapshot) {
        if(snapshot.val()){
            store.dispatch(setProfileImage(snapshot.val().profileImage));
        }
        else{
            const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);
            storageRef.getDownloadURL()
                .then(function(url) {
                    store.dispatch(setProfileImage(url));
                }).catch(function(error) {
                //
            });
        }
    });
}


class App extends React.Component {
    render() {
        if (!store.getState().auth.loggedIn && store.getState().auth.loginRequest) {
            return(
                <Login/>
            )
        }
        else {
            return (
                <div className="grid-tess">
                    <Routes podcast={store.getState().podcast} myUsername={store.getState().myUsername} myBio={store.getState().myBio} myProfileImage={store.getState().myProfileImage} user={store.getState().user}/>
                    <Footer podcast={store.getState().podcast} myUsername={store.getState().myUsername} myBio={store.getState().myBio} myProfileImage={store.getState().myProfileImage} user={store.getState().user}/>
                </div>
            )
        }
    }
}

const render = () => ReactDOM.render(<App />, app);
render();
store.subscribe(render);
module.hot.accept();