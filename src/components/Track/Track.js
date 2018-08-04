import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import track from '../../images/track.png';
import {MenuButton, ListItem,} from 'react-md';
import Button from "antd/es/button/button";
import { store } from "../../store";
import { setPodcast } from "../../actions";


export const Track = (props) => {
    return (
        <div className="tsTrack">
            <div className="wrapImg">
                <img src={props.podcast.profileImage} alt="track"/>
            </div>
            <div className={"trackInfo"}>
                <div>
                    <a href={"#"} className="title" >{props.podcast.podcastTitle}</a>
                    <a href={"#"} className="album">{props.podcast.username}</a>
                    <Button data-podcast={props.podcast} onClick={() => {
                        console.log(props.podcast.podcastTitle);
                        console.log(props.podcast.podcastArtist);
                        console.log(props.podcast.id);
                        console.log(props.podcast.username);
                        console.log(props.podcast.profileImage);
                        const {podcast} = props;
                        store.dispatch(setPodcast(podcast));
                    }}/>
                </div>
                <MenuButton
                    id={"tscmenu"+ props.menukey}
                    className={"contextMenu"}
                    icon
                    menuItems={[
                        <ListItem key={1} primaryText="Share"/>,
                        <ListItem key={2} primaryText="Add to Queue"/>,
                        <ListItem key={3} primaryText="Add to Playlist"/>,
                        <ListItem key={4} primaryText="Add to Favorites"/>,
                        <ListItem key={5} primaryText="Go to Profile"/>,
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
