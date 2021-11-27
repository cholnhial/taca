import * as actionTypes from "../actions/actionTypes";
import * as constants from '../../constants';
import {updateObject} from "../utility";

const initialState = {
    roomId: null,
    secret: null,
    otherUser: '',
    otherUserLastMessageTone: constants.emojiMap.unknown,
    messageTone: null,
    error: false
};

const setMessageTone = (state, action) => {
    return updateObject(state, {
        messageTone: action.messageTone
    })
}


const getMessageToneFailed = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.SET_MESSAGE_TONE: return setMessageTone(state, action);
        case actionTypes.GET_MESSAGE_TONE_FAILED: return getMessageToneFailed(state, action)
        default: return state;
    }
};

export default reducer;
