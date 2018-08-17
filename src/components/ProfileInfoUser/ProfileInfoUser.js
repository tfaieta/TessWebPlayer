import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import profile from '../../images/profile.png';
import firebase from 'firebase';
import { store } from "../../store";
import {followed} from "../../actions/index";


export const Profile = (props) => {
    return (
        <div className="tsProfile">
            <div>
                <div className="profileImg">
                    <img src={props.profileInfo.profileImage} alt="profile"/>
                </div>
                <h4>{props.profileInfo.username}</h4>
                <div className="follow">
                    <a onClick={() => {
                        let currentUser = {uid: store.getState().auth.uid};
                        if(currentUser.uid != ''){
                            const id = store.getState().user.id;
                            if(store.getState().user.following){
                                firebase.database().ref(`users/${currentUser.uid}/following/${id}`).remove();
                                firebase.database().ref(`users/${id}/followers/${currentUser.uid}`).remove();
                                store.dispatch(followed(!store.getState().user.following));
                            }
                            else{
                                firebase.database().ref(`users/${currentUser.uid}/following`).child(id).push(id);
                                firebase.database().ref(`users/${id}/followers/`).child(currentUser.uid).push(currentUser.uid);
                                firebase.database().ref(`users/${currentUser.uid}/activity`).push({action: 'follow', id: id, user: currentUser.uid, time: firebase.database.ServerValue.TIMESTAMP});
                                store.dispatch(followed(!store.getState().user.following));
                            }
                        }
                    }}>
                        {store.getState().user.following ? 'UNFOLLOW' : 'FOLLOW'}
                    </a>
                </div>
                <div className="specialisation">{props.profileInfo.bio}</div>
            </div>
            <div className="info-wrap">
                <div>
                    Following <span>{props.userFollowing.length}</span>
                </div>
                <div>
                    Followers <span>{props.userFollowers.length}</span>
                </div>
                <div>
                    Tracking <span>{props.userTrackingList.length}</span>
                </div>
            </div>
        </div>
    )
}
Profile.propTypes = {}
