import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Button,SVGIcon } from 'react-md';
import replay from './icons/replay.svg';
import pause from './icons/pause.svg';
import forward from './icons/forward.svg';
import { store } from "../../store";
import Sound from 'react-sound';
import {setPlayStatus} from "../../actions/index";

export const PlayerControls = (props) => {
    return (
        <div className="tsPlayerControls">
            <Sound
                url={store.getState().podcast.podcastURL}
                playStatus={store.getState().player.playStatus}
                volume={100}
                playbackRate={store.getState().player.playBackRate}
                autoLoad={true}
                {...props} />
            <Button icon className={"ctrBtn"}  swapTheming><img src={replay}/></Button>
            <Button icon className={"ctrBtn bigPlay"} swapTheming><img src={pause} onClick={() => {
                const playStatus = store.getState().player.playStatus;
                if(playStatus == 'PLAYING'){
                    store.dispatch(setPlayStatus('PAUSED'));
                }
                else if(playStatus == 'PAUSED'){
                    store.dispatch(setPlayStatus('PLAYING'));
                }
                else if(playStatus == 'STOPPED'){
                    store.dispatch(setPlayStatus('PLAYING'));
                }
                else{
                    store.dispatch(setPlayStatus('PLAYING'));
                }
            }}/></Button>
            <Button icon className={"ctrBtn"} swapTheming><img src={forward}/></Button>

        </div>
    )
}
PlayerControls.propTypes = {}
