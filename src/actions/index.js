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