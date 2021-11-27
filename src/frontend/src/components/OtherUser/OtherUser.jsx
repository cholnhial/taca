import {Col, Row} from "react-bootstrap";
import React, {Fragment, useEffect, useState} from "react";

const OtherUser = (props) => {
    const [tone,setTone] = useState(props.tone)

    useEffect(() => {
        setTone(props.tone);
    }, [props.tone]);

    return (
        <Fragment>
        <Row className="mt-2">
            <Col className="d-flex align-items-center" md={12}>
                <img style={{width: "32px", height: "32px"}} alt="Tone" src={"/src/assets/images/emojis/" + tone.img} /> <span className="fs-2">{props.username}</span>
            </Col>
        </Row>
        <p  style={{color: "white"}}>Seems {tone.text}</p>
        </Fragment>
    )
}

export default OtherUser;
