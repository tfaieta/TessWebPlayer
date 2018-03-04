import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import track from '../../images/track.png';
import {MenuButton, ListItem,} from 'react-md';

export const Track = (props) => {
    return (
        <div className="tsTrack">
            <div className="wrapImg">
                <img src={track} alt="track"/>
            </div>
            <div className={"trackInfo"}>
                <div>
                    <a href={"#"} className="title" >Ep. 42 - 01/31/19Ep. 42 - 01/31/19Ep. 42 - 01/31/19</a>
                    <a href={"#"} className="album">The Chillcast</a>
                </div>
                <MenuButton
                    id={"tscmenu"+ props.menukey}
                    className={"contextMenu"}
                    icon
                    menuItems={[
                        <ListItem key={1} primaryText="Item One"/>,
                        <ListItem key={2} primaryText="Item Two"/>,
                        <ListItem key={3} primaryText="Item 3"/>,
                        <ListItem key={4} primaryText="Item 4"/>,
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
}
Track.propTypes = {}
