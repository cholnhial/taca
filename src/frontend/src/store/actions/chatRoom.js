import * as actionTypes from './actionTypes';
import axios from "../../axios-api";
import {emojiMap} from "../../constants";

export const setMessageTone = (messageTone) => {
    return {
        type: actionTypes.SET_MESSAGE_TONE,
        messageTone: messageTone
    }
}

export const getMessageToneFailed = () => {
    return {
        type: actionTypes.GET_MESSAGE_TONE_FAILED
    }
}

export const getMessageTone = (message) => {
    return (dispatch) => {
        axios.post(`/tone-analyzer/message`, {message: message})
            .then((response) => {
                dispatch(setMessageTone(emojiMap[response.data.tone]))

            })
            .catch((error) => {
                dispatch(getMessageToneFailed())
            })
    }
}
