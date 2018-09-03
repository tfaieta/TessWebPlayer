import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import thumb from '../../images/thumbplayer.png';
import {Button} from 'react-md';
import { store } from "../../store";
import {favorited} from "../../actions/index";
import firebase from 'firebase';


export const PlayInfo = (props) => {
    return (
        <div className="tsPlayInfo">
            <img className={"th-img"} src={store.getState().podcast.profileImage} alt=""/>
            <div className={"tsPlayInfo-details"}>
                <div className="title">{store.getState().podcast.podcastTitle}</div>
                <div className="album-title">{store.getState().podcast.username}</div>
                <Button className={"tsDefaultBtn"} onClick={() => {
                    let currentUser = {uid: store.getState().auth.uid};
                    if(currentUser && store.getState().podcast.id != ''){
                        const id = store.getState().podcast.id;
                        if(store.getState().podcast.favorited){
                            firebase.database().ref(`users/${currentUser.uid}/favorites/${id}`).remove();
                            store.dispatch(favorited(!store.getState().podcast.favorited));
                        }
                        else{
                            firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(id).update({id});
                            store.dispatch(favorited(!store.getState().podcast.favorited));
                        }
                    }
                }} raised>{store.getState().podcast.favorited ? 'Remove from Favorites' : 'Add to Favorites'}</Button>
            </div>
        </div>
    )
}
PlayInfo.propTypes = {}
