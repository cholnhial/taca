import React from "react";
import styles from './Join.module.css';
import {Button, Card, Form} from "react-bootstrap";

const join = () => {
    return (
        <Card className={[styles.join, "mx-auto"]}>
            <Card.Header className={[styles['card-header']]}>JOIN</Card.Header>
            <Card.Body className="text-center">
                <Card.Title>Join the fun</Card.Title>
                <Form.Control size="lg" type="text" placeholder="Username" />
            </Card.Body>
            <Card.Footer  className={[styles['card-footer']]}>
                <Button className={[styles.joinButton, "float-end"]} variant="primary">JOIN</Button>
            </Card.Footer>
        </Card>
    )
}

export default join
