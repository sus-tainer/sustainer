import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, Col, Container, Row } from 'react-bootstrap';

const stripePromise = loadStripe('your_stripe_publishable_key');

const PaymentForm = () => {
  const [form, setForm] = React.useState({
    cardName: '',
    email: '',
    error: 'Credit Card Information Not Valid',
    loading: false,
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setForm({ ...form, loading: true });

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(
        'your_payment_intent_client_secret',
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: form.email,
              name: form.cardName,
            },
          },
        },
      );

      if (paymentIntent.status === 'succeeded') {
        setForm({ ...form, loading: false });
        // Payment successful, you can handle success here
      } else {
        setForm({ ...form, loading: false, error: 'Payment failed' });
      }
    } catch (error) {
      setForm({ ...form, loading: false, error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: 'auto', fontSize: '22px' }}>
      <div style={{ marginBottom: '2em' }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '22px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div style={{ marginBottom: '2em' }}>
        <input
          type="text"
          name="cardName"
          value={form.cardName}
          onChange={handleInputChange}
          placeholder="Card Name"
          style={{ width: '100%', padding: '1.5em', fontSize: '22px' }}
        />
      </div>
      <div style={{ marginBottom: '2em' }}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="Email"
          style={{ width: '100%', padding: '1.5em', fontSize: '22px' }}
        />
      </div>
      <button
        type="submit"
        disabled={form.loading}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '1.5em',
          width: '100%',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '24px',
        }}
      >
        Submit
      </button>
      {form.error && <p style={{ color: 'red', fontSize: '22px' }}>Error: {form.error}</p>}
    </form>
  );
};
import { ComponentIDs, PageIDs } from '../utilities/ids';

const App = () => {
  return (
    <Container
      className="py-5"
      fluid
      style={{
        background: 'url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp) no-repeat center center fixed',
        backgroundSize: 'cover',
        height: '100vh',
        fontSize: '24px',
      }}
    >
      <Row className="d-flex justify-content-center">
        <Col md="10" lg="8" xl="6">
          <Card className="rounded-3" style={{ fontSize: '24px' }}>
      <Row className="d-flex justify-content-center" id={PageIDs.addPayment}>
        <Col md="10" lg="8" xl="5">
          <Card className="rounded-3">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3 style={{ fontSize: '28px' }}>Settings</h3>
                <h6 style={{ fontSize: '24px' }}>Payment</h6>
              </div>
              {/* Your existing content */}
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
              <p className="fw-bold mb-4 pb-2">Saved cards:</p>
              {/* Display saved cards */}
              {savedCards.map((card, index) => (
                <div key={index} className="d-flex flex-row align-items-center mb-4 pb-1">
                  {/* Display card icon based on type */}
                  {/* ... */}
                  <div className="flex-fill mx-3">
                    <Form.Group className="form-outline">
                      <Form.Control type="text" size="lg" value={card.cardNumber} disabled />
                    </Form.Group>
                  </div>
                  <Button variant="danger" onClick={() => handleRemoveCard(index)}>
                    Remove card
                  </Button>
                </div>
              ))}

              <p className="fw-bold mb-4">Add new card:</p>
              {/* Form for adding a new card */}
              <Form.Group className="form-outline">
                <Form.Control
                  id={ComponentIDs.addCardHolderName}
                  type="text"
                  size="lg"
                  placeholder="Cardholder Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-outline">
                <Form.Control
                  id={ComponentIDs.addCardHolderNumber}
                  type="text"
                  size="lg"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>
              <Row className="my-4">
                <Col xs="6">
                  <Form.Group className="form-outline">
                    <Form.Control
                      id={ComponentIDs.addCardExpiration}
                      type="text"
                      size="lg"
                      placeholder="MM/YYYY"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="form-outline">
                    <Form.Control
                      id={ComponentIDs.addCardCV}
                      type="text"
                      size="lg"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCVV(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                id={ComponentIDs.addPaymentFormSubmit}
                variant="success"
                size="lg"
                block
                onClick={handleAddCard}
              >
                Add card
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
