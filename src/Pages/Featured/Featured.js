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
                                        <a href={"podcasts"} className="title" >Podcasts</a>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <a href={"playlists"} className="title" >Playlists</a>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <a href={"favorites"} className="title" >Favorites</a>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <a href={"highlights"} className="title" >Highlights</a>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <a href={"history"} className="title" >History</a>
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