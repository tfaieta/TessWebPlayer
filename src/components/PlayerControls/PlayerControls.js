import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Button,SVGIcon } from 'react-md';
import replay from './icons/replay.svg';
import pause from './icons/pause.svg';
import forward from './icons/forward.svg';
export const PlayerControls = (props) => {
    return (
        <div className="tsPlayerControls">

            <Button icon className={"ctrBtn"}  swapTheming><img src={replay}/></Button>
            <Button icon className={"ctrBtn bigPlay"} swapTheming><img src={pause}/></Button>
            <Button icon className={"ctrBtn"} swapTheming><img src={forward}/></Button>

        </div>
    )
}
PlayerControls.propTypes = {}
