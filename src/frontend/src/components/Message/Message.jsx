const Message = (props) => {

    let component = null;

    if (props.message.from != props.username) {
        component = (
            <div className="yours messages">
                <div className="message rounded">
                    {props.message.message}
                </div>
            </div>
        )
    } else {
        component = <div className="mine messages">
            <div className={[ "message", props.last ? "last" : ''].join(" ")}>
                {props.message.message}
            </div>
        </div>
    }

    return (
        component
    )
}

export default Message;
