import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Slider } from 'react-md';
import { store } from "../../store";
import {setPlayBackRate} from "../../actions/index";

export const PlayBack = (props) => {
    return (
        <div className="tsPlayBack">
            <div className={"tsLabel"}>Playback Speed</div>
            <Slider id="continuous-plain-slider" rightIcon={null} max={2} min={0.5} step={0.1} defaultValue={1} onChange={(value) => {
                console.log(value);
                store.dispatch(setPlayBackRate(value));
            }}/>
            <div className={"tsLabelsWrap"}><span>0.5</span><span>{store.getState().player.playBackRate.toFixed(1)}</span><span>2.0</span></div>
        </div>
    )
}
PlayBack.propTypes = {}
