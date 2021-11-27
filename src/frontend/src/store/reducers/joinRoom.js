import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utility";

const initialState = {
    roomId: null,
    secret: null,
    timedOut: false,
    isNameTaken: false,
    error: false
};

const setJoinInfo = (state, action) => {
    return updateObject(state, {
        roomId: action.joinInfo.roomId,
        isNameTaken: action.joinInfo.isNameTaken,
        otherUser: action.joinInfo.otherUser
    });
}

const joinFailed = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const joinTimedOut = (state, action) => {
    return updateObject(state, {
        timedOut: true
    })
}

const joinReset = (state, action) => {
    return updateObject(state, {
        timedOut: false,
        isNameTaken: false
    })
}

const setSecret = (state, action) => {
    return updateObject(state, {
      secret: action.secret
    })
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.SET_JOIN_INFO: return setJoinInfo(state, action);
        case actionTypes.JOIN_FAILED: return joinFailed(state, action)
        case actionTypes.JOIN_TIMEDOUT: return joinTimedOut(state, action)
        case actionTypes.JOIN_RESET: return joinReset(state, action)
        case actionTypes.SET_SECRET: return setSecret(state, action)
        default: return state;
    }
};

export default reducer;
