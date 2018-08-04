import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import thumb from '../../images/thumbplayer.png';
import {Button} from 'react-md';
import { store } from "../../store";

export const PlayInfo = (props) => {
    return (
        <div className="tsPlayInfo">
            <img className={"th-img"} src={store.getState().podcast.profileImage} alt=""/>
            <div className={"tsPlayInfo-details"}>
                <div className="title">{store.getState().podcast.podcastTitle}</div>
                <div className="album-title">{store.getState().podcast.username}</div>
                <Button className={"tsDefaultBtn"} raised>Add to Favorites</Button>
            </div>
        </div>
    )
}
PlayInfo.propTypes = {}
