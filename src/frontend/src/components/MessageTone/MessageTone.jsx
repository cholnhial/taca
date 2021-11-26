import styles from "../Chat/Chat.module.css";
import React, {Fragment, useEffect, useState} from "react";

const MessageTone = (props) => {
    const [tone, setTone] = useState(props.tone);
    useEffect(() => {
        setTone(props.tone);
    }, [props.tone])
    return (
        <Fragment>
            <span className={[styles.textTone, "fs-5 text-muted"].join(" ")}>Your response tone: </span> <img style={{width: "32px", height: "32px"}} alt="Tone" src={"/src/assets/images/emojis/" + tone.img} /><span className="text-muted fs-5 ms-2"> {tone.text}</span>
        </Fragment>
    )
}
