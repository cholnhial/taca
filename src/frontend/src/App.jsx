import './App.css'
import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {HashRouter, Route, Switch} from 'react-router-dom';
import ChatRoom from "./views/ChatRoom/ChatRoom";

const JoinRoom = React.lazy(() => import('./views/JoinRoom/JoinRoom'));

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
                        <Route path="/join-room"  name="Join Room" render={(props) => <JoinRoom {...props} />} />
                        <Route path="/chat-room"  name="Chat Room" render={(props) => <ChatRoom {...props} />} />
                    </Switch>
                </React.Suspense>
            </HashRouter>
        </div>

    </div>
  )
}

export default App
