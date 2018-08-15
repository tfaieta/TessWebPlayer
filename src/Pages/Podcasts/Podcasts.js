import React, {Component} from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import firebase from 'firebase';
import {Pod} from "../../components/Pod/Pod";
import {store} from "../../store/index";


export class Podcasts extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);

        this.state = {
            podcasts: []
        };

        let currentUser = {uid: store.getState().auth.uid};
        let podcasts = [];
        if(currentUser){
            const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);
            refFol.orderByChild('following').once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.key){
                        firebase.database().ref(`users/${data.key}/username`).once("value", function (user) {
                            if(user.val()){
                                firebase.database().ref(`users/${data.key}/bio`).once("value", function (bio) {
                                    if(bio.val()){
                                        firebase.database().ref(`users/${data.key}/profileImage`).once('value', function (image) {
                                            if(image.val()){
                                                podcasts.push({username: user.val().username, id: data.key, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                for(let i = podcasts.length-1; i > 0 && podcasts[i].username.toLowerCase() > podcasts[i-1].username.toLowerCase(); i--){
                                                    let temp = podcasts[i-1];
                                                    podcasts[i-1] = podcasts[i];
                                                    podcasts[i] = temp;
                                                }
                                            }
                                            else{
                                                const storageRef = firebase.storage().ref(`/users/${data.key}/image-profile-uploaded`);
                                                storageRef.getDownloadURL()
                                                    .then(function(url) {
                                                        podcasts.push({username: user.val().username, id: data.key, profileImage: url, bio: bio.val().bio, following: true});
                                                        for(let i = podcasts.length-1; i > 0 && podcasts[i].username.toLowerCase() > podcasts[i-1].username.toLowerCase(); i--){
                                                            let temp = podcasts[i-1];
                                                            podcasts[i-1] = podcasts[i];
                                                            podcasts[i] = temp;
                                                        }
                                                    }).catch(function(error) {
                                                    //
                                                });
                                            }
                                        })
                                    }
                                })
                            }
                        });
                    }
                })
            });
        }

        this.timeout1 = setTimeout(() => {this.setState({podcasts: podcasts.reverse(), })}, 2000);
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
                                        <h2>{store.getState().auth.loggedIn ? 'Podcasts' : 'Log in to see your followed podcasts!'}</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.podcasts.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Pod menukey={i} user={_}/>
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