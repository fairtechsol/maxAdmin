import React, { memo, useMemo, useState } from "react";
import { Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaSearchPlus, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LogoSection from "../../../components/commonComponent/logoSection";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../../components/commonComponent/modal";
import MainHeader from "../../../components/mainHeader";
import { logout } from "../../../store/actions/auth/authActions";
import { AppDispatch, RootState } from "../../../store/store";
import { debounce } from "lodash";
import { searchList } from "../../../store/actions/user/userActions";
// import isMobile from "../../../utils/screenDimension";
// import styled from '@emotion/styled';

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
  const [searchValue, setSearchValue] = useState<any>(null);
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const { searchListData } = useSelector(
    (state: RootState) => state.user.userList
  );

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        searchList({
          createdBy: userDetail?.id,
          userName: value,
        })
      );
    }, 500);
  }, []);

  const handleSearch = (event: any) => {
    const query = event;
    debouncedInputValue(query);
    // setSearchModal(true);
  };

  //   const [selectedUser, setSelectedUser] = useState(null);

  // const handleSearch = (selectedOption: any) => {
  //   if (selectedOption) {
  //     setSelectedUser(selectedOption); // Set the selected user
  //   }
  // };

  // const handleSearchIconClick = () => {
  //   if (selectedUser) {
  //     setSearchModal(true); // Open the modal with the selected user details
  //   }
  // };

  // const handleSearch = (selectedOption: any) => {
  //   if (selectedOption) {
  //     setSearchValue(selectedOption.label);
  //     setSearchModal(true); // Open the modal
  //     debouncedInputValue(selectedOption.label);
  //   }
  // };

  const optionslist =
    searchListData?.users?.map((item: any) => ({
      value: item?.id,
      label: item?.userName,
    })) || [];

  const handleSubmit = (e: any) => {
    // console.log(e.target.value, "aflatoor");
    e.preventDefault();
    // setSearchValue(null);
    setSearchModal(true);
  };

  const customStyles = {
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      fontFamily: 'Roboto Condensed", sans-serif',
      fontSize: 14,
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      cursor: "text",
      borderRadius: "3px",
      borderBottom: "solid 1px",
      zIndex: 999,
      height: "1px",
    }),

    option: (styles: any, { isFocused }: any) => {
      return {
        ...styles,
        cursor: "pointer",
        backgroundColor: isFocused ? "white" : "white",
        color: isFocused ? "rgba(255, 80, 86)" : "black",
        lineHeight: 2,
        height: "30px",
      };
    },

    input: (styles: any) => ({
      ...styles,

      color: "black",
      fontFamily: "Times New Roman, Times, Serif",
      padding: "0px",
    }),

    menu: (styles: any) => ({
      ...styles,
      marginTop: 0,
      boxShadow: "none",
      borderRadius: 0,
    }),

    singleValue: (styles: any) => ({
      ...styles,
      color: "rgba(255, 80, 86)",
    }),
    container: (provided: any) => ({
      ...provided,
      width: { lg: "180px", xs: "150px" },
      borderRadius: "10px",
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
    }),
  };

  const DropdownIndicator = (props: any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <FaSearchPlus size={24} onClick={handleSubmit} />
        </components.DropdownIndicator>
      )
    );
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  // const [searchValue, setSearchValue] = React.useState(null);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Navbar expand="lg" className="bg-primary" data-bs-theme="light">
        <Container fluid>
          <span onClick={props.onClick}>
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
          </span>
          <Navbar.Brand
            href="/admin/active-inactive-user-list"
            className="me-2"
          >
            <LogoSection width="110px" height="38px" />
          </Navbar.Brand>
          {isMobile && (
            <div className="user-dropdown-container">
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
              <Form className="headerSearchMobile">
                <div>
                  <Select
                    value={searchValue}
                    options={optionslist}
                    onInputChange={handleSearch}
                    placeholder="All Client"
                    openMenuOnClick={false}
                    styles={customStyles}
                    classNamePrefix="select"
                    onChange={(item) => {
                      setSearchValue(item);
                    }}
                    components={{ DropdownIndicator }}
                  />
                </div>
              </Form>
            </div>
          )}
          {/* {isMobile && (
            <Form className="headerSearch">
              <div>
                <Select
                  value={searchValue}
                  options={optionslist}
                  onInputChange={handleSearch}
                  placeholder="All Client"
                  openMenuOnClick={false}
                  styles={customStyles}
                  classNamePrefix="select"
                  onChange={(item) => {
                    setSearchValue(item);
                  }}
                  components={{ DropdownIndicator }}
                />
              </div>
            </Form>
          )} */}

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {!isMobile && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  className="navbar-mainLink"
                  href={`/admin/listClients/${localStorage.getItem("key")}`}
                >
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
                    {
                      name: "Casino Result Report",
                      link: "/admin/casinoresult",
                    },
                  ]}
                />
              </Nav>
            </Navbar.Collapse>
          )}
          {!isMobile && (
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
              {/* <Form className="headerSearch" onSubmit={handleSubmit}           autoComplete="off">
              <Form.Group className="" controlId="exampleForm.ControlInput1" >
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="All Clients"
                  value={searchValue}
                  list="clients-list"
                  onChange={handleSearch}
          
                />

                <datalist id="clients-list">
                  {searchListData &&
                    searchListData?.users?.map((item: any) => {
                      return (
                        <option key={item?.id} value={item?.userName}>
                          {item?.userName}
                        </option>
                      );
                    })}
                </datalist>
                <div
                  className="headerSearch-ico"
                  onClick={() => setSearchModal((prev) => !prev)}
                >
                  <FaSearchPlus size={24} />
                </div>
              </Form.Group>
            </Form>
            */}
            </div>
          )}

          {!isMobile && (
            <Form className="headerSearch">
              <div>
                <Select
                  value={searchValue}
                  options={optionslist}
                  onInputChange={handleSearch}
                  placeholder="All Client"
                  openMenuOnClick={false}
                  styles={customStyles}
                  classNamePrefix="select"
                  onChange={(item: any) => {
                    setSearchValue(item);
                  }}
                  components={{ DropdownIndicator }}
                />
              </div>
            </Form>
          )}
        </Container>
      </Navbar>

      <CustomModal
        customClass="modalFull-90 "
        headerStyle="bg-secondary py-2"
        title="User Detail"
        show={SearchModal}
        setShow={setSearchModal}
      >
        <MainHeader userId={searchValue?.value} />
      </CustomModal>
    </>
  );
};

export default memo(Topbar);
