import Chat from "../../components/Chat/Chat";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "../../axios-api";
import _debounce from 'lodash/debounce';
import {useCallback} from "react";

const ChatRoom = (props) => {

    const debounceMessageInputFn = useCallback(_debounce(handleOnMessageInputDebounceFn, 250), []);

    function handleOnMessageInputDebounceFn(message) {
        props.getMessageTone(message);
    }

    const handleOnMessageInputChange = (message) => {
        debounceMessageInputFn(message);
    }

    return (
        <Chat username={props.otherUser} messageTone={props.messageTone} onMessageChange={handleOnMessageInputChange} otherUserMessageTone={props.otherUserLastMessageTone}/>
    )
}

const mapStateToProps = (state) => {
    return {
        otherUser: state.joinRoom.otherUser,
        roomId: state.joinRoom.roomId,
        secret: state.joinRoom.secret,
        otherUserLastMessageTone: state.chatRoom.otherUserLastMessageTone,
        messageTone: state.chatRoom.messageTone
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMessageTone: (message) => dispatch(actions.getMessageTone(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ChatRoom, axios))
