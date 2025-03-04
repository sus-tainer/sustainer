import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, HiddenField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { VendorOrder } from '../../api/vendor/VendorOrder';
import { ApproveOrders } from '../../api/vendor/ApproveVendorOrder';

const bridge = new SimpleSchema2Bridge(VendorOrder.schema);

/* Renders the EditStuff page for editing a single document. */
const EditVendorOrder = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription1 = Meteor.subscribe(VendorOrder.vendorPublicationName);
    const subscription2 = Meteor.subscribe(ApproveOrders.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready();
    // Get the document
    const document = VendorOrder.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, email, event, location, containers, size, scheduledFor } = data;
    ApproveOrders.collection.insert({ firstName, lastName, email, event, location, containers, size, scheduledFor, approval: 1 });
    VendorOrder.collection.update(_id, { $set: { firstName, lastName, email, event, location, containers, size, scheduledFor, approval: 1 } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <Col className="text-center"><h2>Edit Vendor Order</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="firstName" />
                <TextField name="lastName" />
                <TextField name="email" />
                <TextField name="event" />
                <TextField name="location" />
                <TextField name="size" />
                <NumField name="containers" decimal={null} />
                <HiddenField name="createdAt" value={new Date()} />
                <DateField name="scheduledFor" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditVendorOrder;
