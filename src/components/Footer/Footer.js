import React from 'react'
import PropTypes from 'prop-types'
import './footer.scss'
import {Slider} from 'react-md';
import {PlayBack} from '../PlayBack/PlayBack';
import {PlayerControls} from '../PlayerControls/PlayerControls';
import {PlayInfo} from '../PlayInfo/PlayInfo';
import smile from './icons/smile.svg';
import comment from './icons/comment.svg';
import { store } from "../../store";
import {setCurrentTime} from "../../actions/index";

export const Footer = (props) => {
    return (
        <div className="tsFooter">
            <div className="trow-column">
                <div className="play-status">
                    <Slider id="continuous-plain-slider" max={store.getState().player.duration.toFixed(0)} min={0} step={1} defaultValue={0} value={store.getState().player.currentTime.toFixed(0)} onChange={(value) => {
                        console.log(value);
                        store.dispatch(setCurrentTime(value));
                    }}/>
                </div>
                <div className="player-wrap">

                    <div className="tsFavoriteWrap">
                        <PlayInfo/>
                    </div>
                    <div className={"rightControls"}>
                        <div className="tsControlsWrap">
                            <PlayerControls/>
                        </div>
                        <div className="tsPlaybackWrap">
                            <PlayBack/>
                        </div>
                        <div className="tsToolsWrap">
                            <a href={"#"} className="ftools smile-wrap">
                                <img src={smile} alt="likes"/> <span>131</span>
                            </a>

                            <a href={"#"} className="ftools comment-wrap">
                                <img src={comment} alt=""/><span>01</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
Footer.propTypes = {}
