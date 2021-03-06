import React from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import firebase from 'firebase';
import {store} from "../../store/index";


export class TessStudio extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);

        this.state = {
            bestIdeas: [],
            bogw: [],
            idk: [],
        };

        let currentUser = {uid: store.getState().auth.uid};
        // Best Ideas
        let bestIdeas = [];
        firebase.database().ref(`users/${'The Best Ideas Podcast'}/podcasts`).once("value", function (snap) {
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
                            let ep = {podcastTitle: podcast.val().podcastTitle, podcastArtist: podcast.val().podcastArtist, rss: podcast.val().rss, id: podcast.val().id, username: username, profileImage: profileImage, podcastURL: podcastURL, favorited: favorited};
                            bestIdeas.push(ep);
                            }, 1000)
                    }
                })
            })
        });

        // BOGW
        let bogw = [];
        firebase.database().ref(`users/${'Best of Gainesville Weekly Minipod'}/podcasts`).once("value", function (snap) {
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
                            })
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
                            let ep = {podcastTitle: podcast.val().podcastTitle, podcastArtist: podcast.val().podcastArtist, rss: podcast.val().rss, id: podcast.val().id, username: username, profileImage: profileImage, podcastURL: podcastURL, favorited: favorited};
                            bogw.push(ep);
                        }, 1000)
                    }
                })
            })
        });

        // IDK
        let idk = [];
        firebase.database().ref(`users/${'IDK Podcast'}/podcasts`).once("value", function (snap) {
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
                            idk.push(ep);
                        }, 1000)
                    }
                })
            })
        });

        this.timeout1 = setTimeout(() => {this.setState({bestIdeas: bestIdeas, bogw: bogw, idk: idk})}, 2000);
    }

    render() {
        return (
            <div>
                <Header props={this.props}/>

                <div className="tcontent">
                    <AsideNav/>
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h1>The Best Ideas Podcast</h1>
                                        <span className={"subtitle"}>W/ host Taylor Shrum</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.bestIdeas.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i} podcast={_}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h1>Best of Gainesville Weekly Minipod</h1>
                                        <span className={"subtitle"}>The best of local Gainesville eateries</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.bogw.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i} podcast={_}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h1>IDK Podcast</h1>
                                        <span className={"subtitle"}>Four long-time friends discuss all-kinds of topics</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.idk.map((_, i) => (
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