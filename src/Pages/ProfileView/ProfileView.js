import React, {Component} from 'react'
import {Header} from '../../components/Header/Header'
import {Profile as ProfileInfo} from '../../components/ProfileInfoUser/ProfileInfoUser'
import {Track} from '../../components/Track/Track'
import {Button} from 'react-md';
import firebase from 'firebase';
import { store } from "../../store";
import {setUserInfo} from "../../actions/index";


export class ProfileView extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);
        let id = props.location.search.toString().substr(1, props.location.search.toString().length-1);
        id = id.replace(/%20/g, " ");
        console.log(id);

        this.state = {
            eps: [],
            profileInfo: {username: store.getState().user.username, bio: store.getState().user.bio, profileImage: store.getState().user.profileImage},
            userFollowers: [],
            userFollowing: [],
            userTrackingList: []
        };

        // fetch profile
        let currentUser = {uid: id};
        firebase.database().ref(`/users/${id}/username`).orderByChild("username").once("value", function(snap1) {
            if(snap1.val()){
                firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").once("value", function(snap2) {
                    if(snap2.val()){
                        firebase.database().ref(`users/${id}/profileImage`).once("value", function (snap3) {
                            if(snap3.val()){
                                store.dispatch(setUserInfo(snap1.val().username, snap2.val().bio, snap3.val().profileImage, id, false));
                                if(firebase.auth().currentUser.uid){
                                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/following/${currentUser.uid}`).once("value", function (snap4) {
                                        if(snap4.val()){
                                            store.dispatch(setUserInfo(snap1.val().username, snap2.val().bio, snap3.val().profileImage, id, true));
                                        }
                                    })
                                }
                            }
                            else{
                                const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);
                                storageRef.getDownloadURL()
                                    .then(function(url) {
                                        store.dispatch(setUserInfo(snap1.val().username, snap2.val().bio, url, id, false));
                                        if(firebase.auth().currentUser.uid){
                                            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/following/${currentUser.uid}`).once("value", function (snap4) {
                                                if(snap4.val()){
                                                    store.dispatch(setUserInfo(snap1.val().username, snap2.val().bio, snap3.val().profileImage, id, true));
                                                }
                                            })
                                        }
                                    }).catch(function(error) {
                                    //
                                });
                            }
                        });
                    }
                    else {
                        firebase.database().ref(`users/${id}/profileImage`).once("value", function (snap3) {
                            if(snap3.val()){
                                store.dispatch(setUserInfo(snap1.val().username, "Tell others about yourself", snap3.val().profileImage, id, false));
                                if(firebase.auth().currentUser.uid){
                                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/following/${currentUser.uid}`).once("value", function (snap4) {
                                        if(snap4.val()){
                                            store.dispatch(setUserInfo(snap1.val().username, snap2.val().bio, snap3.val().profileImage, id, true));
                                        }
                                    })
                                }
                            }
                            else{
                                const storageRef = firebase.storage().ref(`/users/${id}/image-profile-uploaded`);
                                storageRef.getDownloadURL()
                                    .then(function(url) {
                                        store.dispatch(setUserInfo(snap1.val().username, "Tell others about yourself", url, id, false));
                                        if(firebase.auth().currentUser.uid){
                                            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/following/${currentUser.uid}`).once("value", function (snap4) {
                                                if(snap4.val()){
                                                    store.dispatch(setUserInfo(snap1.val().username, snap2.val().bio, snap3.val().profileImage, id, true));
                                                }
                                            })
                                        }
                                    }).catch(function(error) {
                                    //
                                });
                            }
                        });
                    }
                });
            }
        });
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
                                <ProfileInfo profileInfo={store.getState().user} userFollowers={this.state.userFollowers} userFollowing={this.state.userFollowing} userTrackingList={this.state.userTrackingList}/>
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