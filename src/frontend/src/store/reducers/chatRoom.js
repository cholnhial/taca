import * as actionTypes from "../actions/actionTypes";
import * as constants from '../../constants';
import {DEFAULT_BACKGROUND, emojiMap} from '../../constants';
import {updateObject} from "../utility";

const initialState = {
    roomId: null,
    secret: null,
    otherUser: '',
    otherUserLastMessageTone: constants.emojiMap.unknown,
    messageTone: null,
    messages: [],
    backgroundImage: DEFAULT_BACKGROUND,
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

const addMessage = (state, action) => {
    let object = updateObject(state, {
            messages: [...state.messages, action.message]
        }
    );

    // Only set tone when message comes from other user
    if (state.otherUser === action.message.from) {
        object = updateObject(object, {
            otherUserLastMessageTone: emojiMap[action.message.tone]
        })
    }

    return object;
}

const setOtherUser = (state, action) => {
    return updateObject(state,{
        otherUser: action.otherUsername
    })
}

const setBackgroundUrl = (state, action) => {
    return updateObject(state, {
        backgroundImage: action.url
    })
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.SET_MESSAGE_TONE: return setMessageTone(state, action);
        case actionTypes.GET_MESSAGE_TONE_FAILED: return getMessageToneFailed(state, action);
        case actionTypes.ADD_MESSAGE: return addMessage(state, action);
        case actionTypes.SET_OTHER_USER: return setOtherUser(state, action);
        case actionTypes.SET_BACKGROUND_URL: return setBackgroundUrl(state, action)
        default: return state;
    }
};

export default reducer;
