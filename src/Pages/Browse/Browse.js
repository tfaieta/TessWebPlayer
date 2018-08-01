import React, { Component }  from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Categories} from '../../components/Categories/Categories'
import {Track} from '../../components/Track/Track'
import firebase from 'firebase';


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

        // fetch new episodes
        let fresh = [];
        firebase.database().ref(`podcasts`).limitToLast(50).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                if(snap.val()){
                    if(snap.val().rss){
                        fresh.push(snap.val())
                    }
                }
            });
        });

        // fetch popular episodes
        let topCharts = [];
        const ref = firebase.database().ref(`podcasts/`);
        ref.limitToLast(500).once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.child("plays").numChildren() > 0){
                    topCharts.push(data.val());
                    for(let i = topCharts.length-1; i > 0 && topCharts[i].plays.length > topCharts[i-1].plays.length; i--){
                        let temp = topCharts[i-1];
                        topCharts[i-1] = topCharts[i];
                        topCharts[i] = temp;
                    }
                }
            })
        });

        // get episodes from tess users
        let onTess = [];
        firebase.database().ref(`podcasts`).limitToLast(500).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                if(snap.val()){
                    if(snap.val().rss){
                    }
                    else{
                        onTess.push(snap.val())
                    }
                }
            });
        });

        this.timeout1 = setTimeout(() => {this.setState({dataSourceFresh: fresh, dataSourceCharts: topCharts, onTess: onTess})}, 1000);

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
                                        <h1>Popular</h1>
                                        <span className={"subtitle"}>Trending Episodes On Tess</span>
                                    </div>
                                    <Categories/>
                                </div>
                                <div className="row">
                                    {this.state.dataSourceCharts.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i} data = {_}/>
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
                                    <Categories/>
                                </div>
                                <div className="row">
                                    {this.state.dataSourceFresh.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i} data = {_}/>
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
                                    <Categories/>
                                </div>
                                <div className="row">
                                    {this.state.onTess.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i} data = {_}/>
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