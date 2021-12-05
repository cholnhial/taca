import './App.css'
import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {HashRouter, Route, Switch} from 'react-router-dom';

const JoinRoom = React.lazy(() => import('./views/JoinRoom/JoinRoom'));
const ChatRoom = React.lazy(() => import('./views/ChatRoom/ChatRoom'));

function App() {
  return (
    <div className="App">
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">TACA</Navbar.Brand>
            </Container>
        </Navbar>
        <br />
        <div className="container">
            <HashRouter>
                <React.Suspense fallback={"Loading..."}>
                    <Switch>
                        <Route path="/"  name="Join Room"  render={(props) => <JoinRoom {...props} />} />
                        <Route path="/chat-room"  name="Chat Room"  render={(props) => <ChatRoom {...props} />} />
                    </Switch>
                </React.Suspense>
            </HashRouter>
        </div>

    </div>
  )
}

export default App
