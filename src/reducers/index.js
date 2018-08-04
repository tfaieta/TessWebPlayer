export default (state, action) => {
    switch (action.type) {
        case "SET_PODCAST":
            return {
                ...state,
                podcast: action.podcast
            };

        default:
            return state;
    }
};