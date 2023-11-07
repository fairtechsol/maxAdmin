import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GiHamburgerMenu } from 'react-icons/gi';

function Topbar(props: any) {
  return (
    <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
      <Container fluid >
        <Navbar.Brand href="#home"><img src='/logo.webp' /></Navbar.Brand>
        <div onClick={props.onClick}><GiHamburgerMenu /></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">List of clients</Nav.Link>
            <Nav.Link href="#link">Market Analysis</Nav.Link>
            <NavDropdown title="Live Market" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Binary</NavDropdown.Item>
              <NavDropdown.Item href="#">Race 20-20</NavDropdown.Item>
              <NavDropdown.Item href="#">Queen</NavDropdown.Item>
              <NavDropdown.Item href="#">Baccarat</NavDropdown.Item>
              <NavDropdown.Item href="#">Sports Casino</NavDropdown.Item>
              <NavDropdown.Item href="#">Casino War</NavDropdown.Item>
              <NavDropdown.Item href="#">Worli</NavDropdown.Item>
              <NavDropdown.Item href="#">3 Cards Judgement</NavDropdown.Item>
              <NavDropdown.Item href="#">32 Cards Casino</NavDropdown.Item>
              <NavDropdown.Item href="#">Live TeenPatti</NavDropdown.Item>
              <NavDropdown.Item href="#">TeenPatti 2.0</NavDropdown.Item>
              <NavDropdown.Item href="#">Live Poker</NavDropdown.Item>
              <NavDropdown.Item href="#">Andar Bahar</NavDropdown.Item>
              <NavDropdown.Item href="#">Lucky 7</NavDropdown.Item>
              <NavDropdown.Item href="#">Dragon Tiger</NavDropdown.Item>
              <NavDropdown.Item href="#">Bollywood Casino</NavDropdown.Item>
              <NavDropdown.Item href="#">Cricket Casino</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Account's Statement</NavDropdown.Item>
              <NavDropdown.Item href="#">Current Bets</NavDropdown.Item>
              <NavDropdown.Item href="#">General Report</NavDropdown.Item>
              <NavDropdown.Item href="#">Game Report</NavDropdown.Item>
              <NavDropdown.Item href="#">Casino Report</NavDropdown.Item>
              <NavDropdown.Item href="#">Profit And Loss</NavDropdown.Item>
              <NavDropdown.Item href="#">Casino Result Report</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;