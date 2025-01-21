import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Bell, PersonCircle } from 'react-bootstrap-icons'; // Bootstrap Icons
import "../../../Assets/Stlyes/header.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

const  Header = () => {
  const navigate =  useNavigate()
  const handleLogout = () => { // Remove tokens from cookies
   Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    toast(" Logout Successfull")
    navigate("/");
  }
  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Container >
        {/* Left Side: Logo */}
        <Navbar.Brand href="/">
          {/* <img
            src="https://via.placeholder.com/30" // Replace with your logo URL
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '} */}
        Data Search
        </Navbar.Brand>

        {/* Right Side: Notification and Profile Icons */}
        <Nav className="ms-auto">
          {/* Notification Icon */}
          {/* <Nav.Link href="#notifications">
            <Bell size={20} color="white" />
          </Nav.Link> */}

          {/* Profile Dropdown */}
          <NavDropdown
            title={<PersonCircle size={20} color="white" />}
            id="profile-dropdown"
            align="end"
            menuVariant="dark"
          >
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout} >Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
