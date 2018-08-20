export function setAuth (username, email, bool, uid, error, request) {
    return {
        type: "SET_AUTH",
        username: username,
        email: email,
        loggedIn: bool,
        uid: uid,
        errorMessage: error,
        loginRequest: request
    }
}

export function setPodcast (text) {
    return {
        type: "SET_PODCAST",
        podcast: text
    }
}

export function setUsername (text) {
    return {
        type: "SET_USERNAME",
        info: text
    }
}

export function setBio (text) {
    return {
        type: "SET_BIO",
        info: text
    }
}

export function setProfileImage (text) {
    return {
        type: "SET_PROFILEIMAGE",
        info: text
    }
}

export function setPlayStatus (text) {
    return {
        type: "SET_PLAYSTATUS",
        status: text
    }
}

export function setPlayBackRate (text) {
    return {
        type: "SET_PLAYBACKRATE",
        rate: text
    }
}

export function setCurrentTime (text) {
    return {
        type: "SET_CURRENTTIME",
        time: text
    }
}

export function setDuration (text) {
    return {
        type: "SET_DURATION",
        time: text
    }
}

export function setVolume (text) {
    return {
        type: "SET_VOLUME",
        volume: text
    }
}

export function favorited (text) {
    return {
        type: "FAVORITED",
        bool: text
    }
}

export function setUserInfo (username, bio, image, id, following) {
    return {
        type: "SETUSERINFO",
        username: username,
        bio: bio,
        image: image,
        id: id,
        following: following
    }
}

export function followed (text) {
    return {
        type: "FOLLOWED",
        bool: text
    }
}

export function updateSearchValue (text) {
    return {
        type: "UPDATE_SEARCH",
        value: text
    }
}

export function updateFile (file) {
    return {
        type: "UPDATE_FILE",
        file: file
    }
}

export function updateUploadTitle (text) {
    return {
        type: "UPDATE_UPLOAD_TITLE",
        title: text
    }
}

export function updateUploadDescription (text) {
    return {
        type: "UPDATE_UPLOAD_DESCRIPTION",
        description: text
    }
}

export function updateUploadCategory (text) {
    return {
        type: "UPDATE_UPLOAD_CATEGORY",
        category: text
    }
}