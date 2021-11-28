import {Button, Card, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import styles from './Chat.module.css'
import React from "react";
import MessageTone from "../MessageTone/MessageTone";
import OtherUser from "../OtherUser/OtherUser";
import Message from "../Message/Message";
import './Chat.css';

const Chat = (props) => {

    const handleMessageInputChange = (event) => {
        props.onMessageChange(event.target.value);
    }

    const handleOnSendMessage = () => {
        props.sendMessageHandler();
    }

    return (
        <Card className={[styles.chat, "mx-auto", "border-0"]} style={{opacity: 0.8}}>
            <Card.Header className={[styles['card-header']]}><span className="fs-3 fw-bolder">CHAT</span>
                <hr />
                <OtherUser tone={props.otherUserMessageTone} username={props.otherUsername}/>
            </Card.Header>
            <Card.Body className="text-center overflow-scroll" style={{height: "15rem"}}>
                {
                    props.messages.map((m, i) => {
                        return <Message key={i} username={m.from} last={props.messages.length == i+1} message={m} />
                    })
                }
            </Card.Body>
            <Card.Footer  className={[styles['card-footer']]}>
                <FloatingLabel controlId="floatingTextarea2" label="Message">
                    <Form.Control
                        as="textarea"
                        onChange={handleMessageInputChange}
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
