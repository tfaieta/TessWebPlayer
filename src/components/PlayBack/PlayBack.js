import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Slider } from 'react-md';

export const PlayBack = (props) => {
    return (
        <div className="tsPlayBack">
            <div className={"tsLabel"}>Playback Speed</div>
            <Slider id="continuous-plain-slider" rightIcon={null}  max={2} min={1} step={0.1} defaultValue={1}/>
            <div className={"tsLabelsWrap"}><span>1.0</span><span>2.0</span></div>
        </div>
    )
}
PlayBack.propTypes = {}
