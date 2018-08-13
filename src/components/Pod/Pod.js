import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { store } from "../../store";
import {setUserInfo} from "../../actions/index";
import { NavLink, Link } from 'react-router-dom'
import firebase from 'firebase';


export const Pod = (props) => {
    return (
        <div className="tsPod">
            <div className="wrapImg">
                <NavLink to='/view'>
                    <a>
                        <img src={props.user.profileImage} onClick={() =>{
                            store.dispatch(setUserInfo(props.user.username, '', props.user.profileImage, props.user.id, true));
                            firebase.database().ref(`users/${props.user.id}/bio`).once('value', function (snapshot) {
                                if(snapshot.val()){
                                    if(snapshot.val().bio){
                                        store.dispatch(setUserInfo(props.user.username, snapshot.val().bio, props.user.profileImage, props.user.id, true));
                                        // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
                                        let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
                                        if(currentUser){
                                            firebase.database().ref(`users/${currentUser.uid}/following/${props.user.id}`).once('value', function (snap) {
                                                if(snap.val()){
                                                    store.dispatch(setUserInfo(props.user.username, snapshot.val().bio, props.user.profileImage, props.user.id, true));
                                                }
                                            })
                                        }
                                    }
                                }
                            })
                        }} alt="pod"/>
                    </a>
                </NavLink>
            </div>
            <div className={"podInfo"}>
                <div>
                    <NavLink to='/view'>
                        <a onClick={() =>{
                            store.dispatch(setUserInfo(props.user.username, '', props.user.profileImage, props.user.id, true));
                            firebase.database().ref(`users/${props.user.id}/bio`).once('value', function (snapshot) {
                                if(snapshot.val()){
                                    if(snapshot.val().bio){
                                        store.dispatch(setUserInfo(props.user.username, snapshot.val().bio, props.user.profileImage, props.user.id, true));
                                        // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
                                        let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
                                        if(currentUser){
                                            firebase.database().ref(`users/${currentUser.uid}/following/${props.user.id}`).once('value', function (snap) {
                                                if(snap.val()){
                                                    store.dispatch(setUserInfo(props.user.username, snapshot.val().bio, props.user.profileImage, props.user.id, true));
                                                }
                                            })
                                        }
                                    }
                                }
                            })
                        }} className="album" >{props.user.username}</a>
                    </NavLink>
                </div>
            </div>
        </div>
    )
};

Pod.propTypes = {}