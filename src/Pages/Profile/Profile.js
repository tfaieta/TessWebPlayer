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
            eps: []
        };

        // get user's episodes
        // const {currentUser} = firebase.auth();       NEED TO BE LOGGED IN
        let currentUser = {uid: 'pgIx9JAiq9aQWcyUZX8AuIdqNmP2'}; // temporary
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
                        }, 1000)
                    }
                })
            })
        });

        this.timeout1 = setTimeout(() => {this.setState({eps: eps})}, 2000);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="tcontent profile-page">
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">
                            <div className="profileWrap">
                                <ProfileInfo/>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>My Episodes</h2>
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