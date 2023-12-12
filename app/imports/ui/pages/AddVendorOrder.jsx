import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, HiddenField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { VendorOrder } from '../../api/vendor/VendorOrder';
import { ApproveOrders } from '../../api/vendor/ApproveVendorOrder';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  event: String,
  location: String,
  containers: Number,
  size: String,
  createdAt: Date,
  scheduledFor: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddVendorOrder = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, event, location, containers, size, createdAt, scheduledFor, approval } = data;
    const email = Meteor.user().username;
    // Username field is email field
    VendorOrder.collection.insert(
      { firstName, lastName, email, event, location, containers, size, createdAt, scheduledFor, approval },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
    ApproveOrders.collection.insert({ firstName, lastName, email, event, location, containers, size, createdAt, scheduledFor, approval });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id="add-vendor-order-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Vendor Order Information</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" id="first-name" />
                <TextField name="lastName" id="last-name" />
                <TextField name="event" id="event" />
                <TextField name="location" id="location" />
                <NumField name="containers" decimal={null} id="containers" />
                <TextField name="size" id="size" />
                <HiddenField name="createdAt" value={new Date()} />
                <DateField name="scheduledFor" value={new Date()} id="schedule" />
                <SubmitField value="Submit" id="submit-vendor-order" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddVendorOrder;
