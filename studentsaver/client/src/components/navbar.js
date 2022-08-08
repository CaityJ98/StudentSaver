import { useContext } from "react";
import { Context } from "../ContextStore";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoLogOut } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BsFillPersonFill, BsFillPlusCircleFill } from "react-icons/bs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import '../styles/navbar.scss'
import Logo from '../assets/images/logo.png';

function NavigationBar() {
  const { userData, setUserData } = useContext(Context);
  // console.log(userData);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
           <img
              src={Logo}
              height="30"
              alt="logo"
              className="d-inline-block align-top"
            />
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/marketplace">Marketplace</NavLink>
            <NavDropdown title="Student Resources" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Finance">Finance</NavDropdown.Item>
              <NavDropdown.Item href="/Health&Wellbeing">
                Health & Wellbeing
              </NavDropdown.Item>
              <NavDropdown.Item href="/studytools">
                Study Tools
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/student-resources-page">
                Student Resources Page
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {userData ? (
            <Nav>
              <NavLink className="nav-item" id="addButton" to="/add-listing">
                {/* /* <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      <strong>Add</strong> a sell.
                    </Tooltip>
                  } */}
                 
                  <BsFillPlusCircleFill />Add a Listing
               
              </NavLink>

              <NavDropdown
                title={
                  <img id="navImg" src={userData.avatar} alt="user-avatar" />
                }
                drop="left"
                id="dropdown"
              >
                <NavLink
                  className="profile-item"
                  to={`/profile/${userData._id}`}
                >
                  <BsFillPersonFill />
                  Profile
                </NavLink>

                <NavLink
                  className="profile-item"
                  to="/auth/logout"
                  onClick={() => {
                    setUserData(null);
                  }}
                >
                  <IoLogOut />
                  Log out
                </NavLink>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link className="justify-content-end" href="/auth/register">
                Sign Up
              </Nav.Link>

              <Nav.Link
                className="nav-item"
                id="nav-sign-in"
                href="/auth/login"
              >
                Sign In
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
