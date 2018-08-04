import { createStore } from "redux";
import reducer from "../reducers";

const initialState = { podcast: {podcastTitle: 'Select an episode', podcastArtist: '', id: '', username: 'to start listening', profileImage: ''} };
export const store = createStore(reducer, initialState);