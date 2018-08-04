import { createStore } from "redux";
import reducer from "../reducers";

const initialState = { myUsername: '', myBio: '', myProfileImage: '', podcast: {podcastTitle: 'Select an episode', podcastArtist: '', id: '', username: 'to start listening', profileImage: '', podcastURL: ''}, player: {playStatus: 'PLAYING'} };
export const store = createStore(reducer, initialState);