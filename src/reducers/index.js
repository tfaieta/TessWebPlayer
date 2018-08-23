export default (state, action) => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                auth: {username: action.username, email: action.email, loggedIn: action.loggedIn, uid: action.uid, errorMessage: action.errorMessage, loginRequest: action.loginRequest}
            };

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
                player: {playStatus: action.status, playBackRate: state.player.playBackRate, currentTime: state.player.currentTime, duration: state.player.duration, volume: state.player.volume}
            };

        case "SET_PLAYBACKRATE":
            return {
                ...state,
                player: {playBackRate: action.rate, playStatus: state.player.playStatus, currentTime: state.player.currentTime, duration: state.player.duration, volume: state.player.volume}
            };

        case "SET_CURRENTTIME":
            return {
                ...state,
                player: { currentTime: action.time, playBackRate: state.player.playBackRate, playStatus: state.player.playStatus, duration: state.player.duration, volume: state.player.volume}
            };

        case "SET_DURATION":
            return {
                ...state,
                player: { duration: action.time, currentTime: state.player.currentTime, playBackRate: state.player.playBackRate, playStatus: state.player.playStatus, volume: state.player.volume}
            };

        case "SET_VOLUME":
            return {
                ...state,
                player: { volume: action.volume, duration: state.player.duration, currentTime: state.player.currentTime, playBackRate: state.player.playBackRate, playStatus: state.player.playStatus}
            };

        case "FAVORITED":
            return {
                ...state,
                podcast: { favorited: action.bool, podcastTitle: state.podcast.podcastTitle, podcastArtist: state.podcast.podcastArtist, id: state.podcast.id, username: state.podcast.username, profileImage: state.podcast.profileImage, podcastURL: state.podcast.podcastURL}
            };

        case "SETUSERINFO":
            return {
                ...state,
                user: { username: action.username, bio: action.bio, profileImage: action.image, id: action.id, following: action.following}
            };

        case "FOLLOWED":
            return {
                ...state,
                user: { following: action.bool, username: state.user.username, bio: state.user.bio, profileImage: state.user.profileImage, id: state.user.id}
            };

        case "UPDATE_SEARCH":
            return {
                ...state,
                searchValue: action.value
            };

        case "UPDATE_FILE":
            return {
                ...state,
                upload: {file: action.file, title: state.upload.title, description: state.upload.description, category: state.upload.category }
            };

        case "UPDATE_UPLOAD_TITLE":
            return {
                ...state,
                upload: {file: state.upload.file, title: action.title, description: state.upload.description, category: state.upload.category }
            };

        case "UPDATE_UPLOAD_DESCRIPTION":
            return {
                ...state,
                upload: {file: state.upload.file, title: state.upload.title, description: action.description, category: state.upload.category }
            };

        case "UPDATE_UPLOAD_CATEGORY":
            return {
                ...state,
                upload: {file: state.upload.file, title: state.upload.title, description: state.upload.description, category: action.category }
            };


        case "UPDATE_UPLOAD_IMAGE":
            return {
                ...state,
                uploadImage: action.image
            };


        default:
            return state;
    }
};