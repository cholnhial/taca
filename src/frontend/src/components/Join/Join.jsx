import React, {useState} from "react";
import styles from './Join.module.css';
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";

const Join = (props) => {
   const [username, setUsername] = useState('');

   const handleOnUsernameChange = (event) => {
        setUsername(event.target.value);
   }

    return (
        <Card className={[styles.join, "mx-auto"]}>
            <Card.Header className={[styles['card-header']]}>JOIN</Card.Header>
            <Card.Body className="text-center">
                <Card.Title>Join the fun</Card.Title>
                <Form.Control onChange={handleOnUsernameChange} size="lg" type="text" placeholder="Username" />
            </Card.Body>
            <Card.Footer  className={[styles['card-footer']]}>
                <Button onClick={() => props.onJoin(username)} className={[styles.joinButton, "float-end"]} variant="primary">JOIN</Button>
            </Card.Footer>
        </Card>
    )
}

Join.propTypes = {
    onJoin: PropTypes.func,
}
export default Join
