import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import thumb from '../../images/thumbplayer.png';
import {Button} from 'react-md';

export const PlayInfo = (props) => {
    return (
        <div className="tsPlayInfo">
            <img className={"th-img"} src={thumb} alt=""/>
            <div className={"tsPlayInfo-details"}>
                <div className="title">Ep. 3 - Beauty Within</div>
                <div className="album-title">Las Beaute's</div>
                <Button className={"tsDefaultBtn"} raised>Add to Favorites</Button>
            </div>
        </div>
    )
}
PlayInfo.propTypes = {}
