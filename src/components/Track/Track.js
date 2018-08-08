import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import track from '../../images/track.png';
import {MenuButton, ListItem,} from 'react-md';
import Button from "antd/es/button/button";
import { store } from "../../store";
import { setPodcast, setPlayStatus } from "../../actions";
import {setCurrentTime} from "../../actions/index";

export const Track = (props) => {
    return (
        <div className="tsTrack">
            <div className="wrapImg">
                <a>
                <img src={props.podcast.profileImage} alt="track" onClick={() => {
                    console.log(props.podcast.podcastTitle);
                    console.log(props.podcast.podcastArtist);
                    console.log(props.podcast.id);
                    console.log(props.podcast.username);
                    console.log(props.podcast.profileImage);
                    console.log(props.podcast.podcastURL);
                    console.log(props.podcast.favorited);
                    const {podcast} = props;
                    store.dispatch(setPlayStatus('STOPPED'));
                    store.dispatch(setCurrentTime(0));
                    store.dispatch(setPodcast(podcast));
                }}/>
                </a>
            </div>
            <div className={"trackInfo"}>
                <div>
                    <a href={"#"} className="title" >{props.podcast.podcastTitle}</a>
                    <a href={"#"} className="album">{props.podcast.username}</a>
                </div>
                <MenuButton
                    id={"tscmenu"+ props.menukey}
                    className={"contextMenu"}
                    icon
                    menuItems={[
                        <ListItem key={1} primaryText="Share"/>,
                        <ListItem key={2} primaryText="Episode Info"/>,
                        <ListItem key={3} primaryText="Add to Queue"/>,
                        <ListItem key={4} primaryText="Add to Playlist"/>,
                        <ListItem key={5} primaryText="Add to Favorites"/>,
                        <ListItem key={6} primaryText="Go to Profile"/>,
                    ]}

                    anchor={{
                        x: MenuButton.HorizontalAnchors.INNER_RIGHT,
                        y: MenuButton.VerticalAnchors.TOP,
                    }}
                    position={MenuButton.Positions.TOP_RIGHT}
                >
                    more_vert
                </MenuButton>
            </div>
        </div>
    )
};

Track.propTypes = {}