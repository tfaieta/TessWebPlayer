import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    auth: {username: '', email: '', loggedIn: false, uid: '', errorMessage: ''},
    myUsername: '', myBio: '', myProfileImage: '',
    user: {username: '', bio: '', profileImage: '', id: ''},
    podcast: {podcastTitle: 'Select an episode', podcastArtist: '', id: '', username: 'to start listening', profileImage: '', podcastURL: '', favorited: false},
    player: {playStatus: 'PLAYING', playBackRate: 1, currentTime: 0, duration: 100, volume: 100} };
export const store = createStore(reducer, initialState);