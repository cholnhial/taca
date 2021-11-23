import React from 'react';
import Join from '../../components/Join/Join'
import * as actions from '../../store/actions';
import axios from '../../axios-api';
import { connect } from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler";

const JoinRoom = (props) => {

    const handleOnJoin = (username) => {
        props.onJoin(username);
    }

    return (
        <Join onJoin={handleOnJoin}/>
    )
};

const mapStateToProps = (state) => {
    return {
        roomId: state.joinRoom.roomId,
        error: state.joinRoom.error,
        isNameTaken: state.joinRoom.isNameTaken,
        firstJoin: state.joinRoom.firstJoin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onJoin: (username) => dispatch(actions.joinRoom(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(JoinRoom, axios))
