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

  const landingNavbar = () => (
    <Navbar className="navbar">
      <Container className="navbar-container align-items-center">
        <Link to="/" className="navbar-logo " onClick={closeMobileMenu}>
          <h2 className="mt-2">Sustainer <Recycle /></h2>
        </Link>
        <Nav id="main-navbar-nav">
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
                <NavLink to="/About" className="nav-links" onClick={closeMobileMenu} id="about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signin" className="nav-links" onClick={closeMobileMenu} id="login">
                  Sign In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-links" onClick={closeMobileMenu} id="signup">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
  const userNavbar = () => (
    <Navbar className="navbar">
      <Container className="navbar-container align-items-center">
        <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
          <h2 className="mt-2">Sustainer <Recycle /></h2>
        </Link>
        <Nav id="main-navbar-nav">
          <div id="navbar-current-user">
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
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
  const adminNavbar = () => (
    <Navbar className="navbar">
      <Container className="navbar-container align-items-center">
        <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
          <h2 className="mt-2">Sustainer <Recycle /></h2>
        </Link>
        <Nav id="main-navbar-nav">
          <div id="navbar-current-admin">
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
                <NavLink to="/add-container" className="nav-links" onClick={closeMobileMenu} id="add-container">
                  Add Container
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/scan-container" className="nav-links" onClick={closeMobileMenu} id="admin-container-scan">
                  Return Container
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin-list" className="nav-links" onClick={closeMobileMenu} id="list-containers-admin">
                  List
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/charge-user" className="nav-links" onClick={closeMobileMenu} id="admin-charge-user">
                  Charge
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/vendor-order-approval" className="nav-links" onClick={closeMobileMenu} id="admin-order-approval">
                  Approve Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signout" className="nav-links" onClick={closeMobileMenu} id="signout-2">
                  Sign Out
                </NavLink>
              </li>
            </ul>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );

  const vendorNavbar = () => (
    <Navbar className="navbar">
      <Container className="navbar-container align-items-center">
        <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
          <h2 className="mt-2">Sustainer <Recycle /></h2>
        </Link>
        <Nav id="main-navbar-nav">
          <div id="navbar-current-vendor">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <NavLink to="/home" className="nav-links" onClick={closeMobileMenu} id="vendor-home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/vendorscan" className="nav-links" onClick={closeMobileMenu} id="vendor-container-scan">
                  Scan
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/vendororder" className="nav-links" onClick={closeMobileMenu} id="add-vendor-order">
                  Order
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/listvendororder" className="nav-links" onClick={closeMobileMenu} id="vendor-order-history">
                  History
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/listinventory" className="nav-links" onClick={closeMobileMenu} id="vendor-list-inventory">
                  Inventory
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signout" className="nav-links" onClick={closeMobileMenu} id="signout-3">
                  Sign Out
                </NavLink>
              </li>
            </ul>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );

  return (
    <>
      {currentUser === '' && !Roles.userIsInRole(Meteor.userId(), ['admin', 'vendor', 'user']) ? landingNavbar() : null}
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? adminNavbar() : null}
      {Roles.userIsInRole(Meteor.userId(), 'vendor') ? vendorNavbar() : null}
      {currentUser && !Roles.userIsInRole(Meteor.userId(), ['admin', 'vendor']) ? userNavbar() : null}
    </>
  );
};

export default NavBar;
