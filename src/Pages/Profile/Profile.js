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
                        eps.push(podcast.val());
                    }
                })
            })
        });

        this.timeout1 = setTimeout(() => {this.setState({eps: eps})}, 1000);
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
                                            <Track menukey={i}/>
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