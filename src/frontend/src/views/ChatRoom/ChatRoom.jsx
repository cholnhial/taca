import Chat from "../../components/Chat/Chat";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "../../axios-api";
import _debounce from 'lodash/debounce';
import {useCallback, useEffect, useState} from "react";

const ChatRoom = (props) => {
    const [message, setMessage] = useState('');

    const debounceMessageInputFn = useCallback(_debounce(handleOnMessageInputDebounceFn, 250), []);

    useEffect(() => {
        props.connectToRoom(props.roomId);
    }, [])

    useEffect(() => {
        props.setOtherUsername(props.otherUser)
    }, [props.otherUser])

    useEffect(() => {
        document.body.style.backgroundImage = `url(${props.backgroundImage})`;
    }, [props.backgroundImage]);

    /* Fetch a new background based on tone every 30 seconds */
    useEffect(() => {
        const interval = setInterval(() => {
            props.fetchToneBackground(props.otherUserLastMessageTone)
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    function handleOnMessageInputDebounceFn(message) {
        props.getMessageTone(message);
    }

    const handleOnMessageInputChange = (message) => {
        setMessage(message);
        debounceMessageInputFn(message);
    }

    const handleOnSendMessage = () => {
        props.sendMessage(message, props.roomId, props.username);
    }

    return (
        <Chat otherUsername={props.otherUser} username={props.username} sendMessageHandler={handleOnSendMessage} messages={props.messages} roomId={props.roomId} messageTone={props.messageTone} onMessageChange={handleOnMessageInputChange} otherUserMessageTone={props.otherUserLastMessageTone}/>
    )
}

const mapStateToProps = (state) => {
    return {
        otherUser: state.joinRoom.otherUser,
        roomId: state.joinRoom.roomId,
        secret: state.joinRoom.secret,
        otherUserLastMessageTone: state.chatRoom.otherUserLastMessageTone,
        messages: state.chatRoom.messages,
        username: state.joinRoom.username,
        messageTone: state.chatRoom.messageTone,
        backgroundImage: state.chatRoom.backgroundImage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMessageTone: (message) => dispatch(actions.getMessageTone(message)),
        sendMessage: (message, roomId, username) => dispatch(actions.sendMessage(message,roomId, username)),
        connectToRoom: (roomId) => dispatch(actions.connect(roomId)),
        setOtherUsername: (otherUsername) =>  dispatch(actions.setOtherUser(otherUsername)),
        fetchToneBackground: (tone) => dispatch(actions.fetchToneBackground(tone))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ChatRoom, axios))
