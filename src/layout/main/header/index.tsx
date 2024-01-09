import { useState } from "react";
import { Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaSearchPlus, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LogoSection from "../../../components/commonComponent/logoSection";

import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../../components/commonComponent/modal";
import MainHeader from "../../../components/mainHeader";
import { logout } from "../../../store/actions/auth/authActions";
import { AppDispatch, RootState } from "../../../store/store";

interface ItemProps {
  name: string;
  options: Array<any>;
}

const TopbarDropdown = ({ name, options }: ItemProps) => {
  const [show, setShow] = useState(false);
  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };
  return (
    <NavDropdown
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      show={show}
      className="navbar-mainLink"
      title={name}
      id="basic-nav-dropdown"
    >
      {options?.map((option, index) => (
        <NavDropdown.Item key={index}>
          <NavLink to={option.link}>{option.name}</NavLink>
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

const Topbar = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [SearchModal, setSearchModal] = useState(false);
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  return (
    <>
      <Navbar expand="lg" className="bg-primary" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand href="/admin/active-inactive-user-list" className="me-1">
            <LogoSection width="120px" />
          </Navbar.Brand>
          <div onClick={props.onClick}>
            {props.toggle ? (
              <div style={{ width: "28px" }}>
                <FaTimes color="white" size={20} />
              </div>
            ) : (
              <div className="menuHamBurger d-flex flex-column me-2">
                <span className="mb-1"></span>
                <span className="mb-1"></span>
                <span></span>
              </div>
            )}
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="navbar-mainLink" href="/admin/listClients">
                List of clients
              </Nav.Link>
              <Nav.Link
                className="navbar-mainLink"
                href="/admin/market-analysis"
              >
                Market Analysis
              </Nav.Link>
              <TopbarDropdown
                name="Live Market"
                options={[
                  { name: "Ball By Ball", link: "#1" },
                  { name: "Binary", link: "#1" },
                  { name: "Race 20-20", link: "#1" },
                  { name: "Queen", link: "#2" },
                  { name: "Baccarat", link: "#3" },
                  { name: "Sports Casino", link: "#4" },
                  { name: "Casino War", link: "#5" },
                  { name: "Worli", link: "#6" },
                  { name: "3 Cards Judgement", link: "#7" },
                  { name: "32 Cards Casino", link: "#8" },
                  { name: "Live TeenPatti", link: "#9" },
                  { name: "TeenPatti 2.0", link: "#10" },
                  { name: "Live Poker", link: "#11" },
                  { name: "Andar Bahar", link: "#12" },
                  { name: "Lucky 7", link: "#13" },
                  { name: "Dragon Tiger", link: "#14" },
                  { name: "Bollywood Casino", link: "#15" },
                  { name: "Cricket Casino", link: "#16" },
                ]}
              />
              <TopbarDropdown
                name="Reports"
                options={[
                  {
                    name: "Account's Statement",
                    link: "/admin/account-statement",
                  },
                  { name: "Current Bets", link: "/admin/current-bets" },
                  { name: "General Report", link: "/admin/general-report" },
                  { name: "Game Report", link: "/admin/game-report" },
                  { name: "Casino Report", link: "/admin/casino-report" },
                  { name: "Profit And Loss", link: "/admin/profit-loss" },
                  { name: "Casino Result Report", link: "/admin/casinoresult" },
                ]}
              />
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex algin-items-center">
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={userDetail && userDetail?.userName}
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/admin/secure-auth">
                    Secure Auth Verification
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/change_password">
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(logout());
                    }}
                    href="#action/3.4"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <Form className="headerSearch">
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="All Clients" />
                <div
                  className="headerSearch-ico"
                  onClick={() => setSearchModal((prev) => !prev)}
                >
                  <FaSearchPlus size={24} />
                </div>
              </Form.Group>
            </Form>
          </div>
        </Container>
      </Navbar>
      <CustomModal
        customClass="modalFull-90 "
        headerStyle="bg-secondary py-2"
        title="User Detail"
        show={SearchModal}
        setShow={setSearchModal}
      >
        <MainHeader />
      </CustomModal>
    </>
  );
};

export default Topbar;
