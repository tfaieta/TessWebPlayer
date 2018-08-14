import React, {Component} from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'
import firebase from 'firebase';
import {store} from "../../store/index";
import NavLink from "react-router-dom/es/NavLink";
import {
    Button,
    FontIcon,
    SVGIcon,
    TextField,
} from 'react-md';


export class Playlists extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props){
        super(props);

        this.state = {
            playlists: [],
            playlistTitle: ''
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

        this.timeout1 = setTimeout(() => {this.setState({playlists: playlists})}, 1000);
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
                                        <h2>{store.getState().auth.loggedIn ? 'Playlists' : 'Log in to see your playlists!'}</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <TextField
                                        id="application-playlist"
                                        className={"tsInputText"}
                                        label="Create a Playlist"
                                        customSize="Create a Playlist"
                                        fullWidth={false}
                                        maxLength={30}
                                        onChange={(value) => {this.setState({playlistTitle: value})}}
                                    >
                                    </TextField>
                                    <a onClick={() => {
                                        if(this.state.playlistTitle != ''){
                                            let currentUser = {uid: store.getState().auth.uid};
                                            if(currentUser.uid){
                                                let title = this.state.playlistTitle;
                                                firebase.database().ref(`users/${currentUser.uid}/playlist/${title}`).update({title});
                                                this.setState({playlistTitle: ''});
                                                let newPlaylist = {title: title, items: []};
                                                this.state.playlists.push(newPlaylist)
                                            }
                                        }
                                    }} >Create</a>
                                </div>
                                <div className="column">
                                    {this.state.playlists.map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <NavLink to={`/playlist?${_.title}`}>
                                                <h2>{_.title}</h2>
                                            </NavLink>
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