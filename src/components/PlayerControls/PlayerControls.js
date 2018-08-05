import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Button,SVGIcon } from 'react-md';
import replay from './icons/replay.svg';
import pause from './icons/pause.svg';
import play from './icons/play.svg';
import forward from './icons/forward.svg';
import { store } from "../../store";
import Sound from 'react-sound';
import {setCurrentTime, setDuration, setPlayStatus} from "../../actions/index";

export const PlayerControls = (props) => {
    return (
        <div className="tsPlayerControls">

            <Sound
                url={store.getState().podcast.podcastURL}
                playStatus={store.getState().player.playStatus}
                volume={100}
                playbackRate={store.getState().player.playBackRate}
                autoLoad={true}
                position={store.getState().player.currentTime}
                onLoad={(data) => {
                    console.log("Duration: " + data.duration);
                    store.dispatch(setDuration(data.duration));
                    store.dispatch(setPlayStatus('PLAYING'));
                }}
                onPlaying={(data) =>{
                    console.log("Position: " + data.position);
                    store.dispatch(setCurrentTime(data.position));
                }}
                onStop={() => {
                    store.dispatch(setPlayStatus('STOPPED'));
                }}
                {...props} />

            <Button icon className={"ctrBtn"} swapTheming onClick={() => {
                store.dispatch(setCurrentTime(store.getState().player.currentTime - 15000));
            }}><img src={replay}/></Button>

            <Button icon className={"ctrBtn bigPlay"} swapTheming onClick={() => {
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
            }}><img src={store.getState().player.playStatus == 'PLAYING' ? pause : play} /></Button>

            <Button icon className={"ctrBtn"} swapTheming onClick={() => {
                store.dispatch(setCurrentTime(store.getState().player.currentTime + 15000));
            }}><img src={forward}/></Button>

        </div>
    )
}
PlayerControls.propTypes = {}
