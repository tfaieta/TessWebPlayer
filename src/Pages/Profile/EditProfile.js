import React, {Component} from 'react'
import {Header} from '../../components/Header/Header'
import {Profile as ProfileInfo} from '../../components/Profile/Profile'
import {Button, TextField} from 'react-md';
import firebase from 'firebase';
import { store } from "../../store";
import {setBio, setUsername} from "../../actions/index";


export class EditProfile extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);

        this.state = {
            eps: [],
            profileInfo: {username: store.getState().myUsername, bio: store.getState().myBio, profileImage: store.getState().myProfileImage},
            userFollowers: [],
            userFollowing: [],
            userTrackingList: [],
            newUsername: store.getState().myUsername,
            newBio: store.getState().myBio,
            message: '',
        };

        let currentUser = {uid: store.getState().auth.uid};
        const refFol = firebase.database().ref(`users/${currentUser.uid}/followers`);
        const refFollowing = firebase.database().ref(`users/${currentUser.uid}/following`);
        const refTracking = firebase.database().ref(`users/${currentUser.uid}/tracking`);

        let userFollowers = [];
        let userFollowing = [];
        let userTrackingList = [];

        refFol.once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                userFollowers.push(data.key);
            })
        });

        refFollowing.once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                userFollowing.push(data.key);
            })
        });

        refTracking.once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                userTrackingList.push(data.key);
            })
        });

        // get user's episodes
        let eps = [];
        firebase.database().ref(`users/${currentUser.uid}/podcasts`).once("value", function (snap) {
            snap.forEach(function (data) {
                firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (podcast) {
                    if(podcast.val()){
                        let profileImage = '';
                        let podcastURL = '';
                        let favorited = false;
                        if(currentUser){
                            firebase.database().ref(`users/${currentUser.uid}/favorites/${podcast.val().id}`).once('value', function (fav) {
                                if(fav.val()){
                                    favorited = true;
                                }
                            })
                        }
                        if(podcast.val().rss){
                            firebase.database().ref(`users/${podcast.val().podcastArtist}/profileImage`).once("value", function (image) {
                                if(image.val().profileImage){
                                    profileImage = image.val().profileImage;
                                }
                            });
                            podcastURL = podcast.val().podcastURL;
                        }
                        else{
                            const storageRef = firebase.storage().ref(`/users/${podcast.val().podcastArtist}/image-profile-uploaded`);
                            storageRef.getDownloadURL()
                                .then(function(url) {
                                    profileImage = url;
                                }).catch(function(error) {
                                //
                            });
                            firebase.storage().ref(`/users/${podcast.val().podcastArtist}/${podcast.val().id}`).getDownloadURL().catch(() => {console.log("file not found")})
                                .then(function(url){
                                    podcastURL = url;
                                });
                        }
                        let username = '';
                        firebase.database().ref(`users/${podcast.val().podcastArtist}/username`).once("value", function (name) {
                            if(name.val().username){
                                username = name.val().username
                            }
                        });
                        setTimeout(() => {
                            let ep = {podcastTitle: podcast.val().podcastTitle, podcastArtist: podcast.val().podcastArtist, id: podcast.val().id, username: username, profileImage: profileImage, podcastURL: podcastURL, favorited: favorited};
                            eps.push(ep);
                        }, 1000)
                    }
                })
            })
        });

        this.timeout1 = setTimeout(() => {this.setState({eps: eps.reverse(), userFollowers: userFollowers, userFollowing: userFollowing, userTrackingList: userTrackingList})}, 2000);
    }

    render() {
        return (
            <div>
                <Header props={this.props}/>
                <div className="tcontent profile-page">
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">
                            <div className="profileWrap">
                                <ProfileInfo profileInfo={this.state.profileInfo} userFollowers={this.state.userFollowers} userFollowing={this.state.userFollowing} userTrackingList={this.state.userTrackingList}/>
                            </div>
                            <div className="container">
                                <a>{this.state.message}</a>
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <TextField
                                            id="application-username"
                                            className={"tsInputText"}
                                            label='Username'
                                            defaultValue={store.getState().myUsername}
                                            fullWidth={true}
                                            onChange={(value) => this.setState({newUsername: value})}
                                        />
                                    </div>
                                </div>
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <TextField
                                            id="application-username"
                                            className={"tsInputText"}
                                            label='Bio'
                                            defaultValue={store.getState().myBio}
                                            fullWidth={true}
                                            onChange={(value) => this.setState({newBio: value})}
                                        />
                                    </div>
                                </div>
                                <Button onClick={() => {
                                    let currentUser = {uid: store.getState().auth.uid};
                                    if(currentUser.uid != ''){
                                        if(this.state.newUsername != ''){
                                            firebase.database().ref(`usernames/`).child(this.state.newUsername.toLowerCase()).once("value", function (snapshot) {
                                                if(snapshot.val() && (this.state.newUsername != store.getState().myUsername)){
                                                    console.log(snapshot.val().username + " is taken");
                                                    this.setState({message: 'Username is taken!'})
                                                }
                                                else{
                                                    firebase.database().ref(`users/${currentUser.uid}`).child('/username').once('value', function (data) {
                                                        firebase.database().ref(`usernames/${data.val().username}`).remove()
                                                    });
                                                    firebase.database().ref(`usernames`).child(this.state.newUsername.toLowerCase()).update({username: this.state.newUsername.toLowerCase()});
                                                    firebase.database().ref(`users/${currentUser.uid}`).child('/username')
                                                        .update({   username: this.state.newUsername });
                                                    firebase.database().ref(`users/${currentUser.uid}`).child('/bio')
                                                        .update({   bio: this.state.newBio  });

                                                    this.setState({message: 'Updated Successfully'});
                                                    store.dispatch(setUsername(this.state.newUsername));
                                                    store.dispatch(setBio(this.state.newBio));
                                                }
                                            }.bind(this)).catch(() => { console.log("error")} );
                                        }
                                    }
                                }} >
                                    <h2>Update</h2>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}