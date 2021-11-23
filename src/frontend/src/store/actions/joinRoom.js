import * as actionTypes from './actionTypes'
import axios from "../../axios-api";

export const setJoinInfo = (joinInfo) => {
    return {
        type: actionTypes.SET_JOIN_INFO,
        joinInfo: joinInfo
    }
};

export const joinFailed = () => {
    return {
        type: actionTypes.JOIN_FAILED
    }
};

export const joinRoom = (username) => {
    return (dispatch) => {
        axios.post(`/user/join/`, {username: username})
            .then((response) => {
                dispatch(setJoinInfo(response.data))
            })
            .catch((error) => {
                dispatch(joinFailed())
            })
    }
}
