import * as actionTypes from './actionTypes';
import axios from "../../axios-api";
import {API_BASE_URL, emojiMap} from "../../constants";
import _ from 'lodash';

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
        if (message.trim().length == 0) {
            dispatch(setMessageTone(null));
        } else {
            dispatch(setMessageLoading(true));
            axios.post(`/tone-analyzer/message`, {message: message})
                .then((response) => {
                    dispatch(setMessageTone(emojiMap[response.data.tone]))
                    dispatch(setMessageLoading(false));
                })
                .catch((error) => {
                    dispatch(getMessageToneFailed());
                    dispatch(setMessageLoading(false));
                })
        }
    }
}

export const addMessage = (messageObj) => {
    return {
        type: actionTypes.ADD_MESSAGE,
        message: messageObj
    }
}

let stompClient = null;
export const connect = (roomId) => {
   return (dispatch) => {
       let socket = new SockJS(`${API_BASE_URL}/taca-websocket`);
       stompClient = Stomp.over(socket);
       stompClient.connect({}, function (frame) {
           stompClient.subscribe(`/room/${roomId}`, function (message) {
               dispatch(addMessage(JSON.parse(message.body)))
           });
       });
   }
}

export const sendMessage = (message, roomId, username) => {
    return (dispatch) => {
        dispatch(setMessageTone(null));
        stompClient.send(`/app/message/${roomId}`, {}, JSON.stringify({from: username, message: message}))
    }
}

export const setOtherUser = (otherUsername) => {
    return {
        type: actionTypes.SET_OTHER_USER,
        otherUsername: otherUsername
    }
}

export const setBackgroundUrl = (url) => {
    return {
        type: actionTypes.SET_BACKGROUND_URL,
        url: url
    }
}

export const fetchToneBackground = (roomId) => {
    return async (dispatch) => {
        let response  = await axios.get(`/tone-analyzer/room/${roomId}`)
        if (response.status == 200) {
            const tone = emojiMap[response.data.tone];
            response = await axios.get(`https://api.unsplash.com/search/photos?orientation=landscape&client_id=os_bboAd8rSMQeeQVQuUL5dmm9E7ZsyDcoQbb5ohU3U&query=${tone.text}&content_filter=high`);
            if (response.status == 200) {
                const randomImage = _.sample(response.data.results);
                dispatch(setBackgroundUrl(randomImage.urls.full));
            }
        }
    }
}

export const setMessageLoading = (loading) => {
    return {
        type: actionTypes.SET_MESSAGE_LOADING,
        loading: loading
    }
}