import React, {Component} from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import { NavLink, Link } from 'react-router-dom'


export class Featured extends React.Component {
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
                                    <NavLink className={"tsHeaderTitles"} to='/podcasts'>
                                        <a className="title" >Podcasts</a>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <NavLink className={"tsHeaderTitles"} to='/playlists'>
                                        <a className="title" >Playlists</a>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <NavLink className={"tsHeaderTitles"} to='/favorites'>
                                        <a className="title" >Favorites</a>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="container">
                                <div className="trow-header">
                                    <NavLink className={"tsHeaderTitles"} to='/history'>
                                        <a className="title" >History</a>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}