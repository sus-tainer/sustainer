import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { Trash, X, HourglassSplit, Check2 } from 'react-bootstrap-icons';
// import { VendorOrder } from '../../api/vendor/VendorOrder';

/** Renders a single row in the List Vendor Order table. See pages/ListVendorOrder.jsx. */
const VendorOrderItem = ({ vendorOrder, collection }) => {
  const removeItem = (docID) => {
    // console.log(`The item to remove is ${docID}`);
    collection.remove(docID);
  };
  const displayApproval = (order) => {
    if (order === 1) {
      return (
        <Container className="justify-content-center align-content-center" style={{ color: 'darkgoldenrod' }}>
          <HourglassSplit size={32} />
        </Container>
      );
    }
    if (order === 2) {
      return (
        <div className="justify-content-center align-content-center" style={{ color: 'red' }}>
          <X size={40} />
        </div>
      );
    }
    if (order === 3) {
      return (
        <div className="justify-content-center align-content-center" style={{ color: 'darkgreen' }}>
          <Check2 size={32} />
        </div>
      );
    }
    return true;
  };
  const scheduledDate = new Date(vendorOrder.scheduledFor);
  const oneWeekFromToday = new Date();
  oneWeekFromToday.setDate(oneWeekFromToday.getDate() + 7); // Add 7 days to today
  return (
    <tr>
      <td className="text-center my-auto">{displayApproval(vendorOrder.approval)}</td>
      <td>{vendorOrder.event}</td>
      <td>{vendorOrder.location}</td>
      <td>{vendorOrder.containers}</td>
      <td>{vendorOrder.size}</td>
      <td>{vendorOrder.createdAt.toLocaleDateString('en-US')}</td>
      <td>{vendorOrder.scheduledFor.toLocaleDateString('en-US')}</td>
      {scheduledDate > oneWeekFromToday ? <td><Link to={`/edit/${vendorOrder._id}`}>Edit</Link></td> : <td />}
      <td><Button variant="danger" aria-label="Save" onClick={() => removeItem(vendorOrder._id)}><Trash /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
VendorOrderItem.propTypes = {
  vendorOrder: PropTypes.shape({
    approval: PropTypes.number,
    event: PropTypes.string,
    location: PropTypes.string,
    containers: PropTypes.number,
    size: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    scheduledFor: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default VendorOrderItem;
