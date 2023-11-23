import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Containers } from '../../api/container/Containers';
import ContainerQRCodeGenerator from '../components/ContainerQRCodeGenerator';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  owner: {
    type: String,
    defaultValue: Meteor.userId(),
  },
  size: {
    type: String,
    allowedValues: ['small', 'medium', 'large'],
    defaultValue: 'medium',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddContainer page for adding a container. */
const AddContainer = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { size } = data;
    const owner = Meteor.userId();

    // Validate ownerId here if needed
    Containers.collection.insert(
      { size, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          setShowQRCode(true); // Set showQRCode to true after successful submission
        }
      },
    );
  };

  const handlePrint = () => {
    window.print(<ContainerQRCodeGenerator />);
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Container</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <HiddenField name="owner" />
                <SelectField name="size" />
                <SubmitField value="submit" />
                <ErrorsField />

                <button type="button" className="btn btn-primary mt-3" onClick={handlePrint}>
                  Print QR Code
                </button>

              </Card.Body>
            </Card>
            {showQRCode && <ContainerQRCodeGenerator containerData={submit} />}
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddContainer;
