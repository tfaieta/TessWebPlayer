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