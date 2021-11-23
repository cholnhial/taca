import React, {Component, Fragment} from 'react';
import {Button, Modal} from "react-bootstrap";

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null,
            show: false
        }

        UNSAFE_componentDidMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null, show: false } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error, show: true} );
            } );
        }

        UNSAFE_componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null, show: false } );
        }

        render() {
            let modal = null
            if (this.state.error !== null) {
                modal = (
                    <Modal animation={false} show={this.state.show} onHide={this.errorConfirmedHandler}>
                        <Modal.Header closeButton>
                            <Modal.Title>Critical Error</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Oops! something went wrong: {this.state.error.toString()} </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.errorConfirmedHandler}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }

            return (
                <React.Fragment>
                    {modal}
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler;
