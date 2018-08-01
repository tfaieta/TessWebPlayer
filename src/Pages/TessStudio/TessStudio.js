import React from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import firebase from 'firebase';


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

        // Best Ideas
        let bestIdeas = [];
        firebase.database().ref(`users/${'The Best Ideas Podcast'}/podcasts`).once("value", function (snap) {
            snap.forEach(function (data) {
                firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (podcast) {
                    if(podcast.val()){
                        bestIdeas.push(podcast.val());
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
                        bogw.push(podcast.val());
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
                        idk.push(podcast.val());
                    }
                })
            })
        });


        this.timeout1 = setTimeout(() => {this.setState({bestIdeas: bestIdeas, bogw: bogw, idk: idk})}, 1000);
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
                                        <h1>The Best Ideas Podcast</h1>
                                        <span className={"subtitle"}>W/ host Taylor Shrum</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.bestIdeas.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i}/>
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
                                            <Track menukey={i}/>
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