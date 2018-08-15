import React, {Component} from 'react'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import {Pod} from "../../components/Pod/Pod";
import {Button} from 'react-md';
import firebase from 'firebase';
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {store} from "../../store/index";


export class Search extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);
        let searchWord = props.location.search.toString().substr(1, props.location.search.toString().length-1);
        searchWord = searchWord.replace(/%20/g, " ");
        console.log("search word: " + searchWord);

        this.state = {
            eps: [],
            pods: [],
            loading: true
        };

        let currentUser = {uid: store.getState().auth.uid};

        // get podcasts
        let pods = [];
        const refPods = firebase.database().ref(`users/`);
        refPods.once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val()) {
                    firebase.database().ref(`/users/${data.key}/username`).orderByChild("username").once("value", function (username) {
                        if(username.val()) {
                            if (username.val().username.toLowerCase().includes(searchWord.toLowerCase())) {
                                firebase.database().ref(`users/${data.key}/bio`).once("value", function (bio) {
                                    if(bio.val()){
                                        firebase.database().ref(`users/${data.key}/profileImage`).once('value', function (image) {
                                            if(image.val()){
                                                if(currentUser.uid != ''){
                                                    firebase.database().ref(`users/${currentUser.uid}/following/${data.key}`).once('value', function (follow) {
                                                        if(follow.val()){
                                                            pods.push({username: username.val().username, id: data.key, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                        }
                                                    })
                                                }
                                                else{
                                                    pods.push({username: username.val().username, id: data.key, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                                }
                                            }
                                            else{
                                                const storageRef = firebase.storage().ref(`/users/${data.key}/image-profile-uploaded`);
                                                storageRef.getDownloadURL()
                                                    .then(function(url) {
                                                        if(currentUser.uid != ''){
                                                            firebase.database().ref(`users/${currentUser.uid}/following/${data.key}`).once('value', function (follow) {
                                                                if(follow.val()){
                                                                    pods.push({username: username.val().username, id: data.key, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                                }
                                                            })
                                                        }
                                                        else{
                                                            pods.push({username: username.val().username, id: data.key, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                                        }
                                                    }).catch(function(error) {
                                                    //
                                                });
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            })
        });

        // get episodes
        let eps = [];
        const refEps = firebase.database().ref(`podcasts/`);
        refEps.once("value", function (snapshot) {
            eps = [];
            snapshot.forEach(function (podcast) {
                if(podcast.val().podcastTitle.toLowerCase().includes(searchWord.toLowerCase())) {
                    let profileImage = '';
                    let podcastURL = '';
                    let favorited = false;
                    if(currentUser.uid != ''){
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
                    }, 1000);
                }
            })
        });


        this.timeout1 = setTimeout(() => {this.setState({eps: eps, pods: pods, loading: false})}, 3000);
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
                                        <h2>{this.state.loading ? 'Searching...' : 'Podcasts'}</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.pods.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Pod menukey={i} user={_}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>{this.state.loading ? '' : 'Episodes'}</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.eps.map((_, i) => (
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