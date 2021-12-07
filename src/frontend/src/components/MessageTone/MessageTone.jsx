import chatStyles from "../Chat/Chat.module.css";
import React, {Fragment} from "react";
import {RESOURCES_BASE_URL} from "../../constants";
import styles from './MessageTone.module.css'
import {Spinner} from "react-bootstrap";

const MessageTone = (props) => {
    let el = null;
    if (props.tone != null) {
        el = <Fragment>
            <span className={[chatStyles.textTone, "fs-5"].join(" ")}>Your response tone: </span> <img style={{width: "32px", height: "32px"}} alt="Tone" src={`${RESOURCES_BASE_URL}/images/emojis/` + props.tone.img} /><span className="fs-5 ms-2"> {props.tone.text}</span>
        </Fragment>
    }

    if (props.loading) {
        el = <Spinner  className={styles.spinnerBorder} animation="border" />
    }

    return (
        el
    )
}

export default MessageTone;
