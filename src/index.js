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
import { setUserInfo } from "./actions";
import {setBio, setProfileImage, setUsername} from "./actions/index";

const config = {
    apiKey: 'AIzaSyCMCsGc-foyjeiknZt9Nw5Sh8NrC2azZUg',
    authDomain: 'tess-36c94.firebaseapp.com',
    databaseURL: 'https://tess-36c94.firebaseio.com',
    projectId: 'tess-36c94',
    storageBucket: 'tess-36c94.appspot.com',
    messagingSenderId: '1071246914359'

};

firebase.initializeApp(config);
// get user's profile info
// const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
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


class App extends React.Component {
    render() {
        return (
            <div className="grid-tess">
                <Routes podcast={store.getState().podcast} myUsername={store.getState().myUsername} myBio={store.getState().myBio} myProfileImage={store.getState().myProfileImage}/>
                <Footer podcast={store.getState().podcast} myUsername={store.getState().myUsername} myBio={store.getState().myBio} myProfileImage={store.getState().myProfileImage}/>
            </div>
        )
    }
}

const render = () => ReactDOM.render(<App />, app);
render();
store.subscribe(render);
module.hot.accept();