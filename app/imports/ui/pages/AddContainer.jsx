import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Containers } from '../../api/container/Containers';
import ContainerQRCodeGenerator from '../components/ContainerQRCodeGenerator';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  owner: {
    type: String,
    defaultValue: 'ZWO',
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
    const owner = 'ZWO';

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

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id="add-container">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Container</h2></Col>
          <AutoForm id="container-add" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <HiddenField name="owner" />
                <SelectField name="size" id="container-dropdown" />
                <SubmitField value="submit" id="container-add" />
                <ErrorsField />
              </Card.Body>
            </Card>
            <br />
            {showQRCode && <ContainerQRCodeGenerator containerData={submit} />}
          </AutoForm>
        </Col>
      </Row>
      <br />
      <h3>Instructions:</h3>
      <ol>
        <li>Select a size for your container.</li>
        <li>Click the submit button.</li>
        <li>Your QR code will appear below.</li>
        <li>Print the QR code.</li>
        <li>Attach the QR code to your container.</li>
      </ol>
    </Container>
  );
};

export default AddContainer;
