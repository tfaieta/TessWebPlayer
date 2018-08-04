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

        default:
            return state;
    }
};