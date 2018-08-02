import React, {Component} from 'react'
import {Header} from '../../components/Header/Header'
import {Profile as ProfileInfo} from '../../components/Profile/Profile'
import {Track} from '../../components/Track/Track'
import {Button} from 'react-md';
import firebase from 'firebase';


export class Profile extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);

        this.state = {
            eps: [],
            profileInfo: {username: '', bio: '', profileImage: ''},
            userFollowers: [],
            userFollowing: [],
            userTrackingList: []
        };


        // get user's profile info
        // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
        let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
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

        let myUsername = '';
        firebase.database().ref(`/users/${currentUser.uid}/username`).orderByChild("username").once("value", function(snap) {
            if(snap.val()){
                myUsername = snap.val().username;
            }
            else {
                myUsername = '...';
            }
        });

        let myBio = '';
        firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").once("value", function(snap) {
            if(snap.val()){
                    myBio = snap.val().bio;
            }
            else {
                myBio = "Tell others about yourself";
            }
        });

        let myProfileImage = '';
            firebase.database().ref(`users/${currentUser.uid}/profileImage`).once("value", function (snapshot) {
                if(snapshot.val()){
                    myProfileImage = snapshot.val().profileImage;
                }
                else{
                    const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);
                    storageRef.getDownloadURL()
                        .then(function(url) {
                            myProfileImage = url;
                        }).catch(function(error) {
                        //
                    });

                }
            });


        // get user's episodes
        let eps = [];
        firebase.database().ref(`users/${currentUser.uid}/podcasts`).once("value", function (snap) {
            snap.forEach(function (data) {
                firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (podcast) {
                    if(podcast.val()){
                        let profileImage = '';
                        if(podcast.val().rss){
                            firebase.database().ref(`users/${podcast.val().podcastArtist}/profileImage`).once("value", function (image) {
                                if(image.val().profileImage){
                                    profileImage = image.val().profileImage;
                                }
                            })
                        }
                        else{
                            const storageRef = firebase.storage().ref(`/users/${podcast.val().podcastArtist}/image-profile-uploaded`);
                            storageRef.getDownloadURL()
                                .then(function(url) {
                                    profileImage = url;
                                }).catch(function(error) {
                                //
                            });
                        }
                        let username = '';
                        firebase.database().ref(`users/${podcast.val().podcastArtist}/username`).once("value", function (name) {
                            if(name.val().username){
                                username = name.val().username
                            }
                        });
                        setTimeout(() => {
                            let ep = {podcastTitle: podcast.val().podcastTitle, podcastArtist: podcast.val().podcastArtist, id: podcast.val().id, username: username, profileImage: profileImage};
                            eps.push(ep);
                        }, 500)
                    }
                })
            })
        });

        this.timeout1 = setTimeout(() => {this.setState({eps: eps, profileInfo: {username: myUsername, bio: myBio, profileImage: myProfileImage}, userFollowers: userFollowers, userFollowing: userFollowing, userTrackingList: userTrackingList})}, 1000);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="tcontent profile-page">
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">
                            <div className="profileWrap">
                                <ProfileInfo profileInfo={this.state.profileInfo} userFollowers={this.state.userFollowers} userFollowing={this.state.userFollowing} userTrackingList={this.state.userTrackingList}/>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>{this.state.eps.length} Episodes</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.eps.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-4 col-lg-3">
                                            <Track menukey={i} podcast={_}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
<Track/>