import {Col, Row} from "react-bootstrap";
import React, {Fragment, useEffect, useState} from "react";
import {RESOURCES_BASE_URL} from "../../constants";

const OtherUser = (props) => {
    const [tone,setTone] = useState(props.tone)

    useEffect(() => {
        setTone(props.tone);
    }, [props.tone]);

    return (
        <Fragment>
        <Row className="mt-2">
            <Col className="d-flex align-items-center" md={12}>
                <img className="me-1" style={{width: "32px", height: "32px"}} alt="Tone" src={`${RESOURCES_BASE_URL}/images/emojis/` + tone.img} /> <span className="fs-2">{props.username}</span>
            </Col>
        </Row>
        <p  style={{color: "white"}}>Seems {tone.text}</p>
        </Fragment>
    )
}

export default OtherUser;
