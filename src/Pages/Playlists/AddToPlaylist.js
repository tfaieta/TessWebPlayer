import React, {Component} from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import {ListItem,} from 'react-md';
import firebase from 'firebase';
import {store} from "../../store/index";
import NavLink from "react-router-dom/es/NavLink";
import {
    Button,
    FontIcon,
    SVGIcon,
    TextField,
} from 'react-md';


export class AddToPlaylist extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);
        let id = props.location.search.toString().substr(1, props.location.search.toString().length-1);
        id = id.replace(/%20/g, " ");

        this.state = {
            playlists: [],
            playlistTitle: '',
            epID: id
        };

        let currentUser = {uid: store.getState().auth.uid};
        let playlists = [];
        if(currentUser.uid){
            firebase.database().ref(`users/${currentUser.uid}/playlist`).once("value", function (snapshot) {
                playlists = [];
                snapshot.forEach(function (data) {
                    if(data.val()){
                        playlists.push(data.val())
                    }
                })
            })
        }

        this.timeout1 = setTimeout(() => {this.setState({playlists: playlists, epID: id})}, 1000);
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
                                        <h2>{store.getState().auth.loggedIn ? 'Select a Playlist to add to:' : 'Log in to see your playlists!'}</h2>
                                        <NavLink to={`/playlist?${this.state.playlistTitle}`}>
                                            <a className={"album"}>{this.state.playlistTitle ? 'Added to ' + this.state.playlistTitle : ''}</a>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="column">
                                    {this.state.playlists.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <ListItem key={i} primaryText={_.title} onClick={() => {
                                                let currentUser = {uid: store.getState().auth.uid};
                                                let id = this.state.epID;
                                                let title = _.title;
                                                firebase.database().ref(`users/${currentUser.uid}/playlist/${title}/items/${id}`).update({id});
                                                this.setState({playlistTitle: title});
                                            }} />
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