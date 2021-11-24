import React, {useEffect, useState} from 'react';
import Join from '../../components/Join/Join'
import * as actions from '../../store/actions';
import axios from '../../axios-api';
import { connect } from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler";
import styles from './JoinRoom.module.css'
import {Button, Spinner} from "react-bootstrap";

const MAX_JOIN_RETRIES = 30;

const JoinRoom = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState('')
    const [secret, setSecret] = useState(null)

    useEffect(() => {
        if(props.timedOut || props.isNameTaken) {
            setIsLoading(false);
        }
    }, [props.timedOut, props.isNameTaken, props.time]);

    useEffect(() => {
        if(props.secret != null) {
            setSecret(props.secret)
        }
    }, [props.secret]);

    useEffect(() => {
        if (props.roomId != null) {
            console.log("Room found!")
            setIsLoading(false);
        }
    }, [props.roomId]);

    const handleOnJoin = (username) => {
        props.onJoinReset()
        setUser(username)
        setIsLoading(true)
        props.onJoin(username, secret, MAX_JOIN_RETRIES)
    }

    const handleOnTryJoinAgain = () => {
        handleOnJoin(user)
    }

    let display = null;

    if (isLoading) {
        display  = (
            <div className="mx-auto text-center" style={{marginTop: "15%"}}>
                <Spinner className={styles.spinnerBorder} animation="border" />
                <p className={['fs-2', styles.joinText].join(' ')}>Joining...</p>
            </div>

        )
    }
    else if (props.timedOut) {
        display = (<div className="mx-auto text-center">
                     <p className={['fs-1', styles.joinText].join(' ')}>Oops! Timeout</p>
                      <p>We couldn't find you partner</p>
                      <Button onClick={handleOnTryJoinAgain}  className={[styles.TryAgainButton]} >Try Again</Button>
                </div>)
    } else {
        display = <Join username={user} isNameTaken={props.isNameTaken} onJoin={handleOnJoin} />
    }


    return (
        display
    )
};

const mapStateToProps = (state) => {
    return {
        roomId: state.joinRoom.roomId,
        error: state.joinRoom.error,
        secret: state.joinRoom.secret,
        isNameTaken: state.joinRoom.isNameTaken,
        timedOut: state.joinRoom.timedOut,
        firstJoin: state.joinRoom.firstJoin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onJoin: (username, secret, tries) => dispatch(actions.joinRoom(username, secret, tries)),
        onJoinReset: () => dispatch(actions.joinReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(JoinRoom, axios))
