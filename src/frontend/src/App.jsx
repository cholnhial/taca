import './App.css'
import {Container, Nav, Navbar} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header>
          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand href="#home">TACA</Navbar.Brand>
              </Container>
          </Navbar>
          <br />

      </header>
    </div>
  )
}

export default App
