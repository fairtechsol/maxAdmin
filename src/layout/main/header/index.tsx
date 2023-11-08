import { Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { GiHamburgerMenu } from "react-icons/gi";

const Topbar = (props: any) => {
  return (
    <Navbar expand="lg" className="bg-primary" data-bs-theme="light">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img src="/logo.webp" alt="fairGame" />
        </Navbar.Brand>
        <div onClick={props.onClick}>
          <GiHamburgerMenu className="text-white" />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white" href="#home">
              List of clients
            </Nav.Link>
            <Nav.Link className="text-white" href="#link">
              Market Analysis
            </Nav.Link>
            <NavDropdown
              className="text-white"
              title="Live Market"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item className="text-white" href="#">
                Binary
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Race 20-20
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Queen
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Baccarat
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Sports Casino
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Casino War
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Worli
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                3 Cards Judgement
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                32 Cards Casino
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Live TeenPatti
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                TeenPatti 2.0
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Live Poker
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Andar Bahar
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Lucky 7
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Dragon Tiger
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Bollywood Casino
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Cricket Casino
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="text-white"
              title="Reports"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item className="text-white" href="#">
                Account's Statement
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Current Bets
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                General Report
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Game Report
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Casino Report
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Profit And Loss
              </NavDropdown.Item>
              <NavDropdown.Item className="text-white" href="#">
                Casino Result Report
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-white" href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex algin-items-center">
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Secure Auth Verification
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Form>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="All Clients" />
            </Form.Group>
          </Form>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
