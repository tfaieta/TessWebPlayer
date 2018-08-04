export default (state, action) => {
    switch (action.type) {
        case "SET_PODCAST":
            return {
                ...state,
                podcast: action.podcast
            };

        case "SET_USERNAME":
            return {
                ...state,
                myUsername: action.info
            };

        case "SET_BIO":
            return {
                ...state,
                myBio: action.info
            };

        case "SET_PROFILEIMAGE":
            return {
                ...state,
                myProfileImage: action.info
            };

        case "SET_PLAYSTATUS":
            return {
                ...state,
                player: {playStatus: action.status, playBackRate: state.player.playBackRate}
            };

        case "SET_PLAYBACKRATE":
            return {
                ...state,
                player: {playBackRate: action.rate, playStatus: state.player.playStatus}
            };

        default:
            return state;
    }
};