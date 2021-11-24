import React, {useState} from "react";
import styles from './Join.module.css';
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";

const Join = (props) => {
   const [username, setUsername] = useState(props.username);

   const handleOnUsernameChange = (event) => {
        setUsername(event.target.value);
   }

   let error = null
    if (props.isNameTaken) {
        error = <p className="text-danger">The name you entered has already been taken</p>
    }
    return (
        <Card className={[styles.join, "mx-auto"]}>
            <Card.Header className={[styles['card-header']]}>JOIN</Card.Header>
            <Card.Body className="text-center">
                <Card.Title>Join the fun</Card.Title>
                <Form.Control value={username} onChange={handleOnUsernameChange} size="lg" type="text" placeholder="Username" />
                {error}
            </Card.Body>
            <Card.Footer  className={[styles['card-footer']]}>
                <Button onClick={() => props.onJoin(username)} className={[styles.joinButton, "float-end"]} variant="primary">JOIN</Button>
            </Card.Footer>
        </Card>
    )
}

Join.propTypes = {
    onJoin: PropTypes.func,
    username: PropTypes.string,
    isNameTaken: PropTypes.bool
}
export default Join
