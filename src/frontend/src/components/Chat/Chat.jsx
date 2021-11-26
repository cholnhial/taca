import {Button, Card, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import styles from './Chat.module.css'
import React from "react";

const Chat = (props) => {

    return (
        <Card className={[styles.chat, "mx-auto", "border-0"]} style={{opacity: 0.8}}>
            <Card.Header className={[styles['card-header']]}><span className="fs-3 fw-bolder">CHAT</span>
                <hr />
                <Row className="mt-2">
                    <Col className="d-flex align-items-center" md={12}>
                        <img style={{width: "32px", height: "32px"}} alt="Tone" src="/src/assets/images/emojis/sad.png" /> <span className="fs-2">John Brown</span>
                    </Col>
                </Row>
                <p  style={{color: "white"}}>Seems sad</p>
            </Card.Header>
            <Card.Body className="text-center" style={{height: "15rem"}}>

            </Card.Body>
            <Card.Footer  className={[styles['card-footer']]}>
                <FloatingLabel controlId="floatingTextarea2" label="Message">
                    <Form.Control
                        as="textarea"
                        placeholder="Hi..."
                        style={{ height: '60px' }}
                    />
                </FloatingLabel>
                <Row className="mt-2">
                    <Col className="d-flex align-items-center" md={10}>
                        <span className={[styles.textTone, "fs-5 text-muted"].join(" ")}>Your response tone: </span> <img style={{width: "32px", height: "32px"}} alt="Tone" src="/src/assets/images/emojis/sad.png" /><span className="text-muted fs-5 ms-2"> Sad</span>
                    </Col>
                    <Col md={2}>
                        <Button className="tacaButton float-end">SEND</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default Chat;
