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
import {CopyToClipboard} from 'react-copy-to-clipboard';

/* my code
export class Track extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            hover: false
        }

        this.handleHover = this.handleHover.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handlePlayer = this.handlePlayer.bind(this)
    }

    handleHover() {
        console.log('hovering!')
        this.setState({hover: true})
    }

    handleReset() {
        console.log('not hovering')
        this.setState({hover: false})
    }

    handlePlayer() {
        const {podcast} = this.props;
        store.dispatch(setPlayStatus('STOPPED'));
        store.dispatch(setCurrentTime(0));
        store.dispatch(setPodcast(podcast));
    }

    render() {
        return (
            <div className="tsTrack">
                {/* Purely Stylistic: This determines the switching between rendering episode info vs the podcast art */}
                {this.state.hover ? 
                    <a>
                        <div className="wrapContainer" onClick={this.handlePlayer} onMouseLeave={this.handleReset}>
                            <p>THIS IS A TEST</p>        
                        </div>
                    </a> 
                    :
                    <div className="wrapImg">
                        <a>
                            <img src={this.props.podcast.profileImage} alt="track" onClick={() => {
                                console.log(this.props.podcast.podcastTitle);
                                console.log(this.props.podcast.podcastArtist);
                                console.log(this.props.podcast.id);
                                console.log(this.props.podcast.username);
                                console.log(this.props.podcast.profileImage);
                                console.log(this.props.podcast.podcastURL);
                                console.log(this.props.podcast.favorited);
                                const {podcast} = this.props;
                                store.dispatch(setPlayStatus('STOPPED'));
                                store.dispatch(setCurrentTime(0));
                                store.dispatch(setPodcast(podcast));
                                }}

                                onMouseEnter={this.handleHover}
                            />
                        </a>
                    </div> 
                }
                <div className={"trackInfo"}>
                    <div>
                        <NavLink to='/episode'>
                            <a className="title" >{this.props.podcast.podcastTitle}</a>
                        </NavLink>
                        <NavLink to='/view'>
                            <a onClick={() =>{
                                store.dispatch(setUserInfo(this.props.podcast.username, '', this.props.podcast.profileImage, this.props.podcast.podcastArtist, false));
                                firebase.database().ref(`users/${this.props.podcast.podcastArtist}/bio`).once('value', function (snapshot) {
                                    if(snapshot.val()){
                                        if(snapshot.val().bio){
                                            store.dispatch(setUserInfo(this.props.podcast.username, snapshot.val().bio, this.props.podcast.profileImage, this.props.podcast.podcastArtist, false));
                                            // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
                                            let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
                                            if(currentUser){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${this.props.podcast.podcastArtist}`).once('value', function (snap) {
                                                    if(snap.val()){
                                                        store.dispatch(setUserInfo(this.props.podcast.username, snapshot.val().bio, this.props.podcast.profileImage, this.props.podcast.podcastArtist, true));
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            }} className="album" >{this.props.podcast.username}</a>
                        </NavLink>
                    </div>
                    <MenuButton
                        id={"tscmenu"+ this.props.menukey}
                        className={"contextMenu"}
                        icon
                        menuItems={[
                            <ListItem key={1} primaryText="Episode Info"/>,
                            <ListItem key={2} primaryText="Share"/>,
                            <ListItem key={3} primaryText="Add to Queue"/>,
                            <ListItem key={4} primaryText="Add to Playlist"/>,
                            <ListItem key={5} primaryText="Add to Favorites"/>,
                            <NavLink to='/view'>
                                <ListItem onClick={() => {
                                    store.dispatch(setUserInfo(this.props.podcast.username, '', this.props.podcast.profileImage, this.props.podcast.podcastArtist, false));
                                    firebase.database().ref(`users/${this.props.podcast.podcastArtist}/bio`).once('value', function (snapshot) {
                                        if(snapshot.val()){
                                            if(snapshot.val().bio){
                                                store.dispatch(setUserInfo(this.props.podcast.username, snapshot.val().bio, this.props.podcast.profileImage, this.props.podcast.podcastArtist, false));
                                                // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
                                                let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
                                                if(currentUser){
                                                    firebase.database().ref(`users/${currentUser.uid}/following/${this.props.podcast.podcastArtist}`).once('value', function (snap) {
                                                        if(snap.val()){
                                                            store.dispatch(setUserInfo(this.props.podcast.username, snapshot.val().bio, this.props.podcast.profileImage, this.props.podcast.podcastArtist, true));
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }} key={6} primaryText="Go to Profile"/>
                            </NavLink>,
                        ]}
END
*/


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

                    if(store.getState().auth.id != ''){
                        const user = store.getState().auth.uid;
                        let id = props.podcast.id;
                        firebase.database().ref(`podcasts/${id}/plays`).child(user).update({user});
                        firebase.database().ref(`users/${user}/recentlyPlayed/`).once("value", function (snap) {
                            snap.forEach(function (data) {
                                if(data.val().id == id){
                                    firebase.database().ref(`users/${user}/recentlyPlayed/${data.key}`).remove()
                                }
                            });
                            firebase.database().ref(`users/${user}/recentlyPlayed/`).push({id});
                        });
                    }
                }}/>
                </a>
            </div>
            <div className={"trackInfo"}>
                <div>
                    <NavLink to={`/episode?${props.podcast.id}`}>
                        <a className="title" >{props.podcast.podcastTitle}</a>
                    </NavLink>
                    <NavLink to={`/view?${props.podcast.podcastArtist}`}>
                        <a className="album" >{props.podcast.username}</a>
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
                        <ListItem key={2} primaryText="Share Episode"/>,
                        <CopyToClipboard text={`http://localhost:8080/view?${props.podcast.podcastArtist}`}>
                            <ListItem key={3} primaryText="Share Podcast"/>
                        </CopyToClipboard>,
                        <NavLink to={`/addToPlaylist?${props.podcast.id}`}>
                            <ListItem key={4} primaryText="Add to Playlist"/>
                        </NavLink>,
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
                        }} key={5} primaryText={props.podcast.favorited ? 'Remove from Favorites' : 'Add to Favorites'}/>,
                        <NavLink to={`/view?${props.podcast.podcastArtist}`}>
                            <ListItem key={6} primaryText="Go to Profile"/>
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
    }
}

Track.propTypes = {}