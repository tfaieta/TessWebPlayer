import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    auth: {username: '', email: '', loggedIn: false, uid: '', errorMessage: '', loginRequest: false},
    myUsername: '', myBio: '', myProfileImage: '',
    uploadImage: {name: ''},
    upload: {file: {name: ''}, title: '', description: '', category: ''},
    searchValue: '',
    user: {username: '', bio: '', profileImage: '', id: '', following: false},
    podcast: {podcastTitle: 'Select an episode', podcastArtist: '', id: '', username: 'to start listening', profileImage: '', podcastURL: '', favorited: false},
    player: {playStatus: 'PLAYING', playBackRate: 1, currentTime: 0, duration: 100, volume: 100} };
export const store = createStore(reducer, initialState);