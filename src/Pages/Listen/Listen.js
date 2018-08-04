import React, {Component} from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import {CatchUpWidget} from '../../components/CatchUpWidget/CatchUpWidget'
import firebase from 'firebase';


export class Listen extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);

        this.state = {
            homeFollowedContent: []
        };

        // fetch home feed
        // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
        let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
        let homeFollowedContent = [];
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);
        refFol.once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                firebase.database().ref(`users/${data.key}/podcasts`).limitToLast(3).once("value", function (snap) {
                    snap.forEach(function (pod) {
                        firebase.database().ref(`podcasts/${pod.key}`).once("value", function (podcast) {
                            if(podcast.val()){
                                let profileImage = '';
                                let podcastURL = '';
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
                                    let ep = {podcastTitle: podcast.val().podcastTitle, podcastArtist: podcast.val().podcastArtist, id: podcast.val().id, username: username, profileImage: profileImage, podcastURL: podcastURL};
                                    homeFollowedContent.push(ep);
                                    for(let i = homeFollowedContent.length-1; i > 0 && homeFollowedContent[i].id > homeFollowedContent[i-1].id; i--){
                                        let temp = homeFollowedContent[i-1];
                                        homeFollowedContent[i-1] = homeFollowedContent[i];
                                        homeFollowedContent[i] = temp;
                                    }
                                }, 1000);
                            }
                        })
                    });
                });
            })
        });

        this.timeout1 = setTimeout(() => {this.setState({homeFollowedContent: homeFollowedContent, })}, 2000);
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
                                <CatchUpWidget/>
                                <div>
                                </div>
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>From People You Follow</h2>
                                    </div>
                                </div>
                                <div className="row">

                                    {this.state.homeFollowedContent.map((_, i) => (
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