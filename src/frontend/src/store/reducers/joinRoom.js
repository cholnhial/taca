import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-api';
import {updateObject} from "../utility";

const initialState = {
    firstJoin: true,
    roomId: null,
    isNameTaken: false,
    error: false
};

const setJoinInfo = (state, action) => {
    return updateObject(state, {
        roomId: action.joinInfo.roomId,
        isNameTaken: action.joinInfo.isNameTaken,
        firstJoin: false
    });
}

const joinFailed = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.SET_JOIN_INFO: return setJoinInfo(state, action);
        case actionTypes.JOIN_FAILED: return joinFailed(state, action)
        default: return state;
    }
};

export default reducer;
