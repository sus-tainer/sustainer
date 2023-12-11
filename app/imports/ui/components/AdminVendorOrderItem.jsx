import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';

/** Renders a single row in the List Vendor Order table. See pages/ListVendorOrder.jsx. */
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
      <td>{vendorOrder.size}</td>
      <td>{vendorOrder.createdAt.toLocaleDateString('en-US')}</td>
      <td>
        <Button variant="danger" aria-label="Save" onClick={() => removeItem(vendorOrder._id)}><XCircleFill /></Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
VendorOrderItem.propTypes = {
  vendorOrder: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    event: PropTypes.string,
    location: PropTypes.string,
    containers: PropTypes.number,
    size: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default VendorOrderItem;
