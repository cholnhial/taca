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

export const addMessage = (messageObj) => {
    return {
        type: actionTypes.ADD_MESSAGE,
        message: messageObj
    }
}

let stompClient = null;
export const connect = (roomId) => {
   return (dispatch) => {
       let socket = new SockJS('http://localhost:8080/taca-websocket');
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
        stompClient.send(`/app/message/${roomId}`, {}, JSON.stringify({from: username, message: message}))
    }
}
