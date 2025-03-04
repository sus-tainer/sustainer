import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import NavBar from '../components/NavBar';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import Payment from '../pages/Payment';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import AddVendorOrder from '../pages/AddVendorOrder';
import AddContainer from '../pages/AddContainer';
import Home from '../pages/Home';
import ListContainersAdmin from '../pages/ListContainersAdmin';
import QRCodeGenerator from '../components/QRCodeGenerator';
import ListVendorOrder from '../pages/ListVendorOrder';
import EditVendorOrder from '../pages/EditVendorOrder';
import ChargeUser from '../pages/ChargeUser';
import VendorSignUp from '../pages/VendorSignUp';
import AdminContainerScan from '../pages/AdminContainerScan';
import ListVendorInventory from '../pages/ListVendorInventory';
import VendorScan from '../pages/VendorScan';
import About from '../pages/About';
import ApproveVendorOrder from '../pages/AdminOrderApproval';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/About" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/vendorsignup" element={<VendorSignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddContainer /></ProtectedRoute>} />
          <Route path="/qrcode" element={<ProtectedRoute><QRCodeGenerator /></ProtectedRoute>} />
          <Route path="/vendororder" element={<VendorProtectedRoute ready={ready}><AddVendorOrder /></VendorProtectedRoute>} />
          <Route path="/vendorscan" element={<VendorProtectedRoute ready={ready}><VendorScan /></VendorProtectedRoute>} />
          <Route path="/listvendororder" element={<VendorProtectedRoute ready={ready}><ListVendorOrder /></VendorProtectedRoute>} />
          <Route path="/listinventory" element={<VendorProtectedRoute ready={ready}><ListVendorInventory /></VendorProtectedRoute>} />
          <Route path="/edit/:_id" element={<VendorProtectedRoute ready={ready}><EditVendorOrder /></VendorProtectedRoute>} />
          <Route path="/admin-list" element={<AdminProtectedRoute ready={ready}><ListContainersAdmin /></AdminProtectedRoute>} />
          <Route path="/add-container" element={<AdminProtectedRoute ready={ready}><AddContainer /></AdminProtectedRoute>} />
          <Route path="/scan-container" element={<AdminProtectedRoute ready={ready}><AdminContainerScan /></AdminProtectedRoute>} />
          <Route path="/vendor-order-approval" element={<AdminProtectedRoute ready={ready}><ApproveVendorOrder /></AdminProtectedRoute>} />
          <Route path="/charge-user" element={<AdminProtectedRoute ready={ready}><ChargeUser /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

/**
 * VendorProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and vendor role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const VendorProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isVendor = Roles.userIsInRole(Meteor.userId(), 'vendor');
  return (isLogged && isVendor) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Home />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Home />,
};

// Require a component and location to be passed to each VendorProtectedRoute.
VendorProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

VendorProtectedRoute.defaultProps = {
  ready: false,
  children: <Home />,
};

export default App;
