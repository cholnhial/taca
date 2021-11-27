import './App.css'
import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

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
            <BrowserRouter>
                <React.Suspense fallback={"Loading..."}>
                    <Routes>
                        <Route path="/join-room"  name="Join Room" element={<JoinRoom />} />
                        <Route path="/chat-room"  name="Chat Room" element = {<ChatRoom />} />
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
        </div>

    </div>
  )
}

export default App
