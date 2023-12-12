import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import { XCircleFill, CheckSquareFill } from 'react-bootstrap-icons';
// import _ from 'underscore';
import { VendorOrder } from '../../api/vendor/VendorOrder';
// import { ApproveOrders } from '../../api/vendor/ApproveVendorOrder';

/** Renders a single row in the List Vendor Order table. See pages/ListVendorOrder.jsx. */
const VendorOrderItem = ({ vendorOrder, collection }) => {
  const updateBad = (docID) => {
    // console.log(`The item to remove is ${docID}`);
    VendorOrder.collection.update(docID, { $set: { approval: 2 } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Rejected Successfully', 'Order has been rejected', 'success')));
    collection.remove(docID);
  };
  const updateGood = (docID) => {
    // console.log(`The item to remove is ${docID}`);
    // Find associated doc in Vendor order collection
    // const approvalDoc = ApproveOrders.collection.find({ _id: docID });
    // const firstName = _.pluck(approvalDoc, 'firstName');
    // console.log(firstName);
    // console.log(ApproveOrders.collection.find({ _id: docID }));
    // const vendorOrderDoc = VendorOrder.collection.find(
    //   { firstName: first },
    //   { lastName: last },
    //   { email: email },
    //   { event: event },
    //   { location: location },
    //   { containers: containers },
    //   { size: size },
    // );
    // const vendorOrderDocID = vendorOrderDoc._id.toString();
    // console.log(vendorOrderDocID);
    VendorOrder.collection.update(docID, { $set: { approval: 3 } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Approved Successfully', 'Order has been approved', 'success')));
    collection.remove(docID);
  };

  // Return the items in the doc
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
      <td width="300px">
        <Button className="mx-2" variant="success" aria-label="Save" onClick={() => updateGood(vendorOrder._id)}>
          <CheckSquareFill />
        </Button>
        <Button className="mx-2" variant="danger" aria-label="Save" onClick={() => updateBad(vendorOrder._id)}>
          <XCircleFill />
        </Button>
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
