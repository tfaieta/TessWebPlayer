import React, {Component} from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import firebase from 'firebase';


export class Featured extends React.Component {

    constructor(props){
        super(props);
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
                                        <h2>Podcasts</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>Playlists</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>Favorites</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>Highlights</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>History</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}