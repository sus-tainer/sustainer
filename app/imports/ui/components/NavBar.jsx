import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Recycle } from 'react-bootstrap-icons';
import './Navbar2.css';
// import Button from './Button';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  // Test
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <Navbar className="navbar" id="main-navbar-nav">
      <Container className="navbar-container align-items-center">
        {currentUser === '' ? (
          <Link to="/" className="navbar-logo " onClick={closeMobileMenu}>
            <h2 className="mt-2">Sustainer <Recycle /></h2>
          </Link>
        ) : (
          <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
            <h2 className="mt-2">Sustainer <Recycle /></h2>
          </Link>
        )}
        <Nav>
          {/* <------------------------------------ Landing Navbar -----------------------------------------> */}
          {currentUser === '' ? (
            <div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                  <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-links" onClick={closeMobileMenu} id="login">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-links" onClick={closeMobileMenu} id="sign-up">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <div title={currentUser}>
              {/* <------------- User Navbar ------------> */}
              {Roles.userIsInRole(Meteor.userId(), 'user') ? ([
                <div>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                  </div>
                  <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                      <NavLink to="/home" className="nav-links" onClick={closeMobileMenu}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/qrcode" className="nav-links" onClick={closeMobileMenu} id="navbar-qr-code">
                        QR Code
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/payment" className="nav-links" onClick={closeMobileMenu} id="navbar-payment">
                        Payment
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/signout" className="nav-links" onClick={closeMobileMenu} id="sign-out">
                        Sign Out
                      </NavLink>
                    </li>
                  </ul>
                </div>,
              ]) : ''}
              {/* <------------- Admin Navbar ------------> */}
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
                <div>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                  </div>
                  <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                      <NavLink to="/home" className="nav-links" onClick={closeMobileMenu}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/add-container" className="nav-links" onClick={closeMobileMenu}>
                        Add Container
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/scan-container" className="nav-links" onClick={closeMobileMenu}>
                        Scan Container
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/admin-list" className="nav-links" onClick={closeMobileMenu}>
                        Containers List
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/charge-user" className="nav-links" onClick={closeMobileMenu}>
                        Charge User
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/signout" className="nav-links" onClick={closeMobileMenu} id="signout-2">
                        Sign Out
                      </NavLink>
                    </li>
                  </ul>
                </div>,
              ]) : ''}
              {/* <------------- Vendor Navbar ------------> */}
              {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
                <div>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                  </div>
                  <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                      <NavLink to="/home" className="nav-links" onClick={closeMobileMenu}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/vendororder" className="nav-links" onClick={closeMobileMenu}>
                        Vendor Order Form
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/listvendororder" className="nav-links" onClick={closeMobileMenu}>
                        List Vendor Orders
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/signout" className="nav-links" onClick={closeMobileMenu}>
                        Sign Out
                      </NavLink>
                    </li>
                  </ul>
                </div>,
              ]) : ''}
            </div>
          )}
          {/* <NavDropdown id="navbar-current-user" title={currentUser}> */}
          {/*  {Roles.userIsInRole(Meteor.userId(), 'user') ? ([ */}
          {/*    <NavDropdown.Item id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Container</NavDropdown.Item>, */}
          {/*    <NavDropdown.Item id="list-stuff-nav" as={NavLink} to="/list" key="list">List Stuff</NavDropdown.Item>, */}
          {/*  ]) : ''} */}
          {/*  {Roles.userIsInRole(Meteor.userId(), 'admin') ? ( */}
          {/*    <NavDropdown.Item id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</NavDropdown.Item> */}
          {/*  ) : ''} */}
          {/*  <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout"> */}
          {/*    <BoxArrowRight /> */}
          {/*    {' '} */}
          {/*    Sign */}
          {/*    out */}
          {/*  </NavDropdown.Item> */}
          {/* </NavDropdown> */}
          {/* {currentUser ? ([ */}
          {/*  <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Stuff</Nav.Link>, */}
          {/*  <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">List Stuff</Nav.Link>, */}
          {/* ]) : ''} */}
          {/* {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([ */}
          {/*  <Nav.Link id="list-containers-admin" as={NavLink} to="/admin-list" key="admin">Containers List</Nav.Link>, */}
          {/*  <Nav.Link id="scan-containers" as={NavLink} to="/scan" key="admin">Scan Containers</Nav.Link>, */}
          {/* ]) : ''} */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
