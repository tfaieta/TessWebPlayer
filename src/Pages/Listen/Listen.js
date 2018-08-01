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
                        firebase.database().ref(`podcasts/${pod.key}`).once("value", function (data2) {
                            if(data2.val()){
                                homeFollowedContent.push(data2.val());
                                for(let i = homeFollowedContent.length-1; i > 0 && homeFollowedContent[i].id > homeFollowedContent[i-1].id; i--){
                                    let temp = homeFollowedContent[i-1];
                                    homeFollowedContent[i-1] = homeFollowedContent[i];
                                    homeFollowedContent[i] = temp;
                                }
                            }
                        })
                    });
                });
            })
        });

        this.timeout1 = setTimeout(() => {this.setState({homeFollowedContent: homeFollowedContent, })}, 1000);
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