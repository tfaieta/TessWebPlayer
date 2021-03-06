import React, { Component }  from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Categories} from '../../components/Categories/Categories'
import {Track} from '../../components/Track/Track'
import firebase from 'firebase';
import {store} from "../../store/index";
import NavLink from "react-router-dom/es/NavLink";


export class Browse extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props) {
        super(props);

        this.state = {
            dataSourceFresh: [],
            dataSourceCharts: [],
            onTess: [],
        };

        let currentUser = {uid: store.getState().auth.uid};
        // fetch new episodes
        let fresh = [];
        firebase.database().ref(`podcasts`).limitToLast(50).once("value", function (snapshot) {
            snapshot.forEach(function (podcast) {
                if(podcast.val()){
                    if(podcast.val().rss){
                        let profileImage = '';
                        let podcastURL = podcast.val().podcastURL;
                        let favorited = false;
                        if(currentUser){
                            firebase.database().ref(`users/${currentUser.uid}/favorites/${podcast.val().id}`).once('value', function (fav) {
                                if(fav.val()){
                                    favorited = true;
                                }
                            })
                        }
                        firebase.database().ref(`users/${podcast.val().podcastArtist}/profileImage`).once("value", function (image) {
                            if(image.val().profileImage){
                                profileImage = image.val().profileImage;
                            }
                        });
                        let username = '';
                        firebase.database().ref(`users/${podcast.val().podcastArtist}/username`).once("value", function (name) {
                            if(name.val().username){
                                username = name.val().username
                            }
                        });
                        setTimeout(() => {
                            let ep = {podcastTitle: podcast.val().podcastTitle, podcastArtist: podcast.val().podcastArtist, id: podcast.val().id, username: username, profileImage: profileImage, podcastURL: podcastURL, favorited: favorited};
                            fresh.push(ep);
                        }, 1000)
                    }
                }
            });
        });

        // fetch popular episodes
        let topCharts = [];
        const ref = firebase.database().ref(`podcasts/`);
        ref.limitToLast(500).once("value", function (snapshot) {
            snapshot.forEach(function (podcast) {
                if(podcast.child("plays").numChildren() > 0){
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
                        topCharts.push(ep);
                        for(let i = topCharts.length-1; i > 0 && topCharts[i].plays.length > topCharts[i-1].plays.length; i--){
                            let temp = topCharts[i-1];
                            topCharts[i-1] = topCharts[i];
                            topCharts[i] = temp;
                        }
                    }, 1000);
                }
            })
        });

        // get episodes from tess users
        let onTess = [];
        firebase.database().ref(`podcasts`).limitToLast(500).once("value", function (snapshot) {
            snapshot.forEach(function (podcast) {
                if(podcast.val()){
                    if(podcast.val().rss){
                    }
                    else{
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
                        let username = '';
                        firebase.database().ref(`users/${podcast.val().podcastArtist}/username`).once("value", function (name) {
                            if(name.val().username){
                                username = name.val().username
                            }
                        });
                        setTimeout(() => {
                            let ep = {podcastTitle: podcast.val().podcastTitle, podcastArtist: podcast.val().podcastArtist, id: podcast.val().id, username: username, profileImage: profileImage, podcastURL: podcastURL, favorited: favorited};
                            onTess.push(ep);
                        }, 1000)
                    }
                }
            });
        });

        this.timeout1 = setTimeout(() => {this.setState({dataSourceFresh: fresh, dataSourceCharts: topCharts, onTess: onTess})}, 2500);

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
                                        <h1>Popular</h1>
                                        <span className={"subtitle"}>Trending Episodes On Tess</span>
                                    </div>
                                    <NavLink to="/categories">
                                        <Categories/>
                                    </NavLink>
                                </div>
                                <div className="row">
                                    {this.state.dataSourceCharts.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i} podcast={_}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h1>Fresh & New</h1>
                                        <span className={"subtitle"}>New Episodes On Tess</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.dataSourceFresh.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i} podcast={_}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h1>Tess Creators</h1>
                                        <span className={"subtitle"}>Episodes created on Tess</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.onTess.map((_, i) => (
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