import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    myUsername: '', myBio: '', myProfileImage: '',
    podcast: {podcastTitle: 'Select an episode', podcastArtist: '', id: '', username: 'to start listening', profileImage: '', podcastURL: ''},
    player: {playStatus: 'PLAYING', playBackRate: 1, currentTime: 0, duration: 100} };
export const store = createStore(reducer, initialState);