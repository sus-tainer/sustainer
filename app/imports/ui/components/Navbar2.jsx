import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Col, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, Recycle } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="dark" expand="sm">
      <Container className="align-items-center py-3">
        {currentUser === '' ? (
          <Navbar.Brand as={NavLink} to="/">
            <h2 className="mb-0">Sustainer <Recycle /></h2>
          </Navbar.Brand>
        ) : (
          <Navbar.Brand as={NavLink} to="/home">
            <h2 className="mb-0">Sustainer <Recycle /></h2>
          </Navbar.Brand>
        )}
        <Col lg={{ span: 1 }} md={{ span: 2, offset: 1 }} xs={2}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              {currentUser === '' ? (
                <NavDropdown id="login-dropdown" title="Login">
                  <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                    <PersonFill />
                    Sign
                    in
                  </NavDropdown.Item>
                  <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                    <PersonPlusFill />
                    Sign
                    up
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown id="navbar-current-user" title={currentUser}>
                  {Roles.userIsInRole(Meteor.userId(), 'user') ? ([
                    <NavDropdown.Item id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Container</NavDropdown.Item>,
                    <NavDropdown.Item id="list-stuff-nav" as={NavLink} to="/list" key="list">List Stuff</NavDropdown.Item>,
                  ]) : ''}
                  {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <NavDropdown.Item id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</NavDropdown.Item>
                  ) : ''}
                  <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                    <BoxArrowRight />
                    {' '}
                    Sign
                    out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {currentUser ? ([
                <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Stuff</Nav.Link>,
                <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">List Stuff</Nav.Link>,
              ]) : ''}
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
                <Nav.Link id="list-containers-admin" as={NavLink} to="/admin-list" key="admin">Containers List</Nav.Link>,
                <Nav.Link id="scan-containers" as={NavLink} to="/scan" key="admin">Scan Containers</Nav.Link>,
              ]) : ''}
              {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
                <Nav.Link id="list-containers-admin" as={NavLink} to="/admin-list" key="admin">Containers List</Nav.Link>,
                <Nav.Link id="vendor-order-form" as={NavLink} to="/vendororder" key="vendor">Vendor Order Form</Nav.Link>,
              ]) : ''}
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
};

export default NavBar;
