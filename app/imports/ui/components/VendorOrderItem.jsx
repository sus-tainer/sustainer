import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Vendor Order table. See pages/ListVendorOrder.jsx. */
const VendorOrderItem = ({ vendororder, vendorordercollection }) => {
  const removeItem = (docID) => {
    console.log(`The item to remove is ${docID}`);
    vendorordercollection.remove(docID);
  };
  return (
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
      <td><Button variant="danger" onClick={() => removeItem(vendororder._id)}><Trash /></Button></td>
const VendorOrderItem = ({ vendorOrder, collection }) => {
  const removeItem = (docID) => {
    // console.log(`The item to remove is ${docID}`);
    collection.remove(docID);
  };
  return (
    <tr>
      <td>{vendorOrder.firstName}</td>
      <td>{vendorOrder.lastName}</td>
      <td>{vendorOrder.email}</td>
      <td>{vendorOrder.event}</td>
      <td>{vendorOrder.location}</td>
      <td>{vendorOrder.containers}</td>
      <td>
        <Link to={`/edit/${vendorOrder._id}`}>Edit</Link>
      </td>
      <td><Button variant="danger" aria-label="Save" onClick={() => removeItem(vendorOrder._id)}><Trash /></Button></td>
    </tr>
  );
};

/** Require a document to be passed to this component
VendorOrderItem.propTypes = {
  vendororder: PropTypes.shape({
  vendorOrder: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    event: PropTypes.string,
    location: PropTypes.string,
    containers: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  vendorordercollection: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
};

export default VendorOrderItem;
