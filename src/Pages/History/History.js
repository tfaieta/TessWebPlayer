import React, {Component} from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import firebase from 'firebase';
import {store} from "../../store/index";


export class History extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);

        this.state = {
            history: []
        };

        let currentUser = {uid: store.getState().auth.uid};
        let history = [];
        if(currentUser){
            const refHistory = firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed`);
            refHistory.limitToLast(30).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
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
                                history.push(ep);
                            }, 1000);
                        }
                    })
                })
            });
        }

        this.timeout1 = setTimeout(() => {this.setState({history: history.reverse(), })}, 2000);
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="tcontent">
                    <AsideNav/>
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>History</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.history.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
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