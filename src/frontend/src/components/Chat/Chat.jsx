import {Button, Card, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import styles from './Chat.module.css'
import React, {useEffect, useRef, useState} from "react";
import MessageTone from "../MessageTone/MessageTone";
import OtherUser from "../OtherUser/OtherUser";
import Message from "../Message/Message";
import './Chat.css';

const Chat = (props) => {
    const [message, setMessage] = useState('')
    const messagesContainer  = useRef(null);

    useEffect(() => {
        scrollToBottomOfMessagesContainer();
    }, [props.messages])

    const handleMessageInputChange = (event) => {
        setMessage(event.target.value);
        props.onMessageChange(event.target.value);
        if (message.length === 0) {
            props.messageTone = null;
        }
    }

    const sendMessage = () => {
        props.sendMessageHandler();
        setMessage('');
    }

    const handleOnSendMessage = () => {
        sendMessage();
    }

    const handleOnKeyUp = (event) => {

        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    /* Copied from https://codesandbox.io/s/8l2y0o24x9?file=/src/index.js
    *  modified to use useRef()
    * */
    const scrollToBottomOfMessagesContainer = () => {
        const scroll =
            messagesContainer.current.scrollHeight -
            messagesContainer.current.clientHeight;
        messagesContainer.current.scrollTo(0, scroll);
    };

    return (
        <Card className={[styles.chat, "mx-auto", "border-0"]} style={{opacity: 0.8}}>
            <Card.Header className={[styles['card-header']]}><span className="fs-3 fw-bolder">CHAT</span>
                <hr />
                <OtherUser tone={props.otherUserMessageTone} username={props.otherUsername}/>
            </Card.Header>
            <Card.Body ref={messagesContainer} className="text-center overflow-scroll" style={{height: "15rem"}}>
                {
                    props.messages.map((m, i) => {
                        return <Message key={i} username={props.username} last={props.messages.length == i+1} message={m} />
                    })
                }
            </Card.Body>
            <Card.Footer  className={[styles['card-footer']]}>
                <FloatingLabel controlId="floatingTextarea2" label="Message">
                    <Form.Control
                        as="textarea"
                        value={message}
                        onChange={handleMessageInputChange}
                        onKeyUp={handleOnKeyUp}
                        placeholder="Hi..."
                        style={{ height: '60px' }}
                    />
                </FloatingLabel>
                <Row className="mt-2">
                    <Col className="d-flex align-items-center" md={10}>
                        <MessageTone tone={props.messageTone}  />
                    </Col>
                    <Col md={2}>
                        <Button onClick={handleOnSendMessage} className="tacaButton float-end">SEND</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default Chat;
