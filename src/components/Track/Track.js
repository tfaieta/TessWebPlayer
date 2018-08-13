import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import track from '../../images/track.png';
import {MenuButton, ListItem,} from 'react-md';
import Button from "antd/es/button/button";
import { store } from "../../store";
import { setPodcast, setPlayStatus } from "../../actions";
import {favorited, setCurrentTime, setUserInfo} from "../../actions/index";
import { NavLink, Link } from 'react-router-dom'
import firebase from 'firebase';


export const Track = (props) => {
    return (
        <div className="tsTrack">
            <div className="wrapImg">
                <a>
                <img src={props.podcast.profileImage} alt="track" onClick={() => {
                    console.log(props.podcast.podcastTitle);
                    console.log(props.podcast.podcastArtist);
                    console.log(props.podcast.id);
                    console.log(props.podcast.username);
                    console.log(props.podcast.profileImage);
                    console.log(props.podcast.podcastURL);
                    console.log(props.podcast.favorited);
                    const {podcast} = props;
                    store.dispatch(setPlayStatus('STOPPED'));
                    store.dispatch(setCurrentTime(0));
                    store.dispatch(setPodcast(podcast));
                }}/>
                </a>
            </div>
            <div className={"trackInfo"}>
                <div>
                    <NavLink to={`/episode?${props.podcast.id}`}>
                        <a className="title" >{props.podcast.podcastTitle}</a>
                    </NavLink>
                    <NavLink to={`/view?${props.podcast.podcastArtist}`}>
                        <a onClick={() =>{
                            store.dispatch(setUserInfo(props.podcast.username, '', props.podcast.profileImage, props.podcast.podcastArtist, false));
                            firebase.database().ref(`users/${props.podcast.podcastArtist}/bio`).once('value', function (snapshot) {
                                if(snapshot.val()){
                                    if(snapshot.val().bio){
                                        store.dispatch(setUserInfo(props.podcast.username, snapshot.val().bio, props.podcast.profileImage, props.podcast.podcastArtist, false));
                                        // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
                                        let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
                                        if(currentUser){
                                            firebase.database().ref(`users/${currentUser.uid}/following/${props.podcast.podcastArtist}`).once('value', function (snap) {
                                                if(snap.val()){
                                                    store.dispatch(setUserInfo(props.podcast.username, snapshot.val().bio, props.podcast.profileImage, props.podcast.podcastArtist, true));
                                                }
                                            })
                                        }
                                    }
                                }
                            })
                        }} className="album" >{props.podcast.username}</a>
                    </NavLink>
                </div>
                <MenuButton
                    id={"tscmenu"+ props.menukey}
                    className={"contextMenu"}
                    icon
                    menuItems={[
                        <NavLink to={`/episode?${props.podcast.id}`}>
                            <ListItem key={1} primaryText="Episode Info"/>
                        </NavLink>,
                        <ListItem key={2} primaryText="Share"/>,
                        <ListItem key={3} primaryText="Add to Playlist"/>,
                        <ListItem onClick={() => {
                            let currentUser = {uid: store.getState().auth.uid};
                            if(currentUser.uid){
                                const id = props.podcast.id;
                                if(props.podcast.favorited){
                                    firebase.database().ref(`users/${currentUser.uid}/favorites/${id}`).remove();
                                }
                                else{
                                    firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(id).update({id});
                                }
                            }
                        }} key={4} primaryText={props.podcast.favorited ? 'Remove from Favorites' : 'Add to Favorites'}/>,
                        <NavLink to={`/view?${props.podcast.podcastArtist}`}>
                            <ListItem onClick={() => {
                                store.dispatch(setUserInfo(props.podcast.username, '', props.podcast.profileImage, props.podcast.podcastArtist, false));
                                firebase.database().ref(`users/${props.podcast.podcastArtist}/bio`).once('value', function (snapshot) {
                                    if(snapshot.val()){
                                        if(snapshot.val().bio){
                                            store.dispatch(setUserInfo(props.podcast.username, snapshot.val().bio, props.podcast.profileImage, props.podcast.podcastArtist, false));
                                            // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
                                            let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
                                            if(currentUser){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${props.podcast.podcastArtist}`).once('value', function (snap) {
                                                    if(snap.val()){
                                                        store.dispatch(setUserInfo(props.podcast.username, snapshot.val().bio, props.podcast.profileImage, props.podcast.podcastArtist, true));
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            }} key={5} primaryText="Go to Profile"/>
                        </NavLink>,
                    ]}

                    anchor={{
                        x: MenuButton.HorizontalAnchors.INNER_RIGHT,
                        y: MenuButton.VerticalAnchors.TOP,
                    }}
                    position={MenuButton.Positions.TOP_RIGHT}
                >
                    more_vert
                </MenuButton>
            </div>
        </div>
    )
};

Track.propTypes = {}