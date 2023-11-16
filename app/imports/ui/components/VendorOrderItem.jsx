import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Vendor Order table. See pages/ListVendorOrder.jsx. */
const VendorOrderItem = ({ vendororder }) => (
  <tr>
    <td>{vendororder.firstName}</td>
    <td>{vendororder.lastName}</td>
    <td>{vendororder.email}</td>
    <td>{vendororder.event}</td>
    <td>{vendororder.location}</td>
    <td>{vendororder.containers}</td>
    <td>
      <Link to={`/edit/${vendororder._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
VendorOrderItem.propTypes = {
  vendororder: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    event: PropTypes.string,
    location: PropTypes.string,
    containers: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default VendorOrderItem;
