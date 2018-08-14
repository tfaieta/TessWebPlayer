import React, {Component} from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import firebase from 'firebase';
import {store} from "../../store/index";
import NavLink from "react-router-dom/es/NavLink";


export class Playlist extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);
        let title = props.location.search.toString().substr(1, props.location.search.toString().length-1);
        title = title.replace(/%20/g, " ");

        this.state = {
            playlist: [],
            title: props.location.search.toString().substr(1, props.location.search.toString().length-1).replace(/%20/g, " ")
        };

        let currentUser = {uid: store.getState().auth.uid};
        let playlist = [];
        if(currentUser.uid){
            firebase.database().ref(`users/${currentUser.uid}/playlist/${title}/items`).once("value", function (snapshot) {
                snapshot.forEach(function (snap) {
                    if(snap.val().id){
                        firebase.database().ref(`podcasts/${snap.val().id}`).once("value", function (podcast) {
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
                                    playlist.push(ep);
                                }, 1000);
                            }
                        })
                    }
                });
            });
        }

        this.timeout1 = setTimeout(() => {this.setState({playlist: playlist, title: title })}, 2000);
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
                                        <h2>{store.getState().auth.loggedIn ? this.state.title : 'Log in to see your playlists!'}</h2>
                                    </div>
                                    <div className={"tsHeaderTitles"}>
                                        <NavLink to={`/playlists`}>
                                            <a onClick={() => {
                                                let currentUser = {uid: store.getState().auth.uid};
                                                if(currentUser.uid){
                                                    let title = this.state.title;
                                                    firebase.database().ref(`users/${currentUser.uid}/playlist/${title}`).remove()
                                                }
                                            }}>delete</a>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.playlist.map((_, i) => (
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