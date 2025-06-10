import { debounce } from "lodash";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaSearchPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Select, { components } from "react-select";
import LogoSection from "../../../components/commonComponent/logoSection";
import CustomModal from "../../../components/commonComponent/modal";
import UserLockModal from "../../../components/commonComponent/userLockModal";
import MainHeader from "../../../components/mainHeader";
import { logout } from "../../../store/actions/auth/authActions";
import { searchList } from "../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../store/store";
import "./style.scss";

interface ItemProps {
  name: string;
  options: Array<any>;
}

const reportOptions = [
  {
    id: "accountStatement",
    name: "Account Statement",
    link: "/admin/account-statement",
  },
  {
    id: "currentBets",
    name: "Current Bets",
    link: "/admin/current-bets",
  },
  {
    id: "generalReport",
    name: "General Report",
    link: "/admin/general-report",
  },
  {
    id: "gameReport",
    name: "Game Report",
    link: "/admin/game-report",
  },
  {
    id: "liveCasinoResult",
    name: "Casino Report",
    link: "/admin/casino-report",
  },
  {
    id: "partyWinLoss",
    name: "Profit And Loss",
    link: "/admin/profit-loss",
  },
  {
    id: "casinoResult",
    name: "Casino Result Report",
    link: "/admin/casino-result",
  },
];

const TopbarDropdown = ({ name, options }: ItemProps) => {
  const [show, setShow] = useState(false);
  let location = useLocation();
  const handleMouseEnter = () => {
    setShow(true);
  };
  const handleMouseClick = () => {
    setShow(!show);
  };
  const handleMouseLeave = () => {
    setShow(false);
  };
  useEffect(() => {
    handleMouseLeave();
  }, [location.pathname]);

  return (
    <NavDropdown
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      show={show}
      className="navbar-mainLink"
      title={name}
      id="basic-nav-dropdown"
      onClick={handleMouseClick}
    >
      {options?.map((option, index) => (
        <NavLink
          key={index}
          to={option.link}
          onClick={() => setShow(false)}
          className="nav-link custom-hover m-0"
        >
          {option.name}
        </NavLink>
      ))}
    </NavDropdown>
  );
};

const Topbar = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [SearchModal, setSearchModal] = useState(false);
  const [searchValue, setSearchValue] = useState<any>(null);
  const { userDetail } = useSelector((state: RootState) => state.user.profile);
  const [showModal, setShowModal] = useState(false);
  const { searchListData, success, childUsersData } = useSelector(
    (state: RootState) => state.user.userList
  );

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        searchList({
          createdBy: localStorage.getItem("key") as string,
          userName: value,
        })
      );
    }, 500);
  }, []);

  const handleSearch = (event: any) => {
    const query = event;
    debouncedInputValue(query);
  };

  const optionslist =
    searchListData?.users?.map((item: any) => ({
      value: item?.id,
      label: item?.userName,
    })) || [];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchValue?.value && localStorage.getItem("key")) {
      setSearchModal(true);
    } else {
      alert("Please select user!");
      return;
    }
  };

  useEffect(() => {
    if (success && childUsersData) {
      setSearchValue(null);
    }
  }, [success]);

  const customStyles = {
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      fontFamily: 'Roboto Condensed", sans-serif',
      fontSize: 12,
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
      width: isMobile ? "80px" : "160px",
      borderRadius: "10px",
      marginRight: "10px",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "14px",
      color: "#ced4da",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
    }),
  };

  const DropdownIndicator = (props: any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <FaSearchPlus color="#333" size={24} onClick={handleSubmit} />
        </components.DropdownIndicator>
      )
    );
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBlockUserClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  let permissions: any = localStorage.getItem("permissions");
  const parsedPermissions = JSON.parse(permissions);

  return (
    <>
      <Navbar expand="lg" className="bg-primary p-0 px-0" data-bs-theme="light">
        <div className="d-flex ms-0">
          <NavLink
            to={
              !parsedPermissions || parsedPermissions?.userList
                ? `/admin/active-inactive-user-list/${localStorage.getItem(
                    "key"
                  )}`
                : "#"
            }
            className="me-2 mt-1 d-flex"
          >
            <LogoSection width="100%" height="50px" />
          </NavLink>

          <span className="m-3 cursor" onClick={props.onClick}>
            <div className="menuHamBurger d-flex flex-column me-2 mt-1">
              <span className="mb-1" />
              <span className="mb-1" />
              <span />
            </div>
          </span>
          <Navbar id="basic-navbar-nav">
            <Nav className="me-auto">
              {(!parsedPermissions || parsedPermissions?.userList) && (
                <NavLink
                  to={`/admin/listClients/${localStorage.getItem("key")}`}
                  className="nav-link navbar-mainLink custom-hover"
                >
                  List of clients
                </NavLink>
              )}
              {(!parsedPermissions || parsedPermissions?.marketAnalysis) && (
                <NavLink
                  to="/admin/market-analysis"
                  className="nav-link navbar-mainLink custom-hover"
                >
                  Market Analysis
                </NavLink>
              )}
              <TopbarDropdown
                name="Reports"
                options={reportOptions.filter((item) => {
                  if (item.id && parsedPermissions?.[item.id] === false) {
                    return false;
                  }
                  return true;
                })}
              />
              {localStorage.getItem("userRole") === "superAdmin" && (
                <>
                  <Nav.Link
                    className="navbar-mainLink"
                    onClick={handleBlockUserClick}
                  >
                    Lock/Unlock
                  </Nav.Link>
                  <UserLockModal show={showModal} setShowModal={setShowModal} />
                </>
              )}
              {(!parsedPermissions || parsedPermissions?.loginUserCreation) && (
                <NavLink
                  to="/admin/multiLogin"
                  className="nav-link navbar-mainLink custom-hover"
                >
                  Multi Login
                </NavLink>
              )}
            </Nav>
          </Navbar>
          <div className="user-dropdown-container">
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={userDetail && userDetail?.userName}
              menuVariant="dark"
              className="mt-1"
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
              <div className="selectheight">
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
        </div>
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
