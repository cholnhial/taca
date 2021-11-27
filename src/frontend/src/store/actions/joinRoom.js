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

export const joinTimedOut = () => {
    return {
        type: actionTypes.JOIN_TIMEDOUT
    }
}

export const joinReset = () => {
    return {
        type: actionTypes.JOIN_RESET
    }
}

export const setSecret = (secret) => {
    return {
        type: actionTypes.SET_SECRET,
        secret: secret
    }
}

export const joinRoom = (username, secret, tries) => {
    let interval = null;
    let totalRetries  = 0;
    return (dispatch) => {
      interval = setInterval(() => {
          totalRetries++;
          if (totalRetries < tries) {
              axios.post(`/user/join/`, {username: username, secret: secret})
                  .then((response) => {
                      if (totalRetries === 1) {
                          // first request contains secret
                          secret = response.data.secret;
                          dispatch(setSecret(response.data.secret))
                      }
                      dispatch(setJoinInfo(response.data))
                      if (response.data.isNameTaken || response.data.roomId) {
                          clearInterval(interval);
                      }

                  })
                  .catch((error) => {
                      dispatch(joinFailed())
                  })
          }

          if(totalRetries == tries) {
              clearInterval(interval);
              dispatch(joinTimedOut())
          }

      }, 2000)
    }
}
