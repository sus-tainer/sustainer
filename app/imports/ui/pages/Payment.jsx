import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

const stripePromise = loadStripe('your_stripe_publishable_key');

const PaymentForm = () => {
  const [form, setForm] = React.useState({
    email: '',
    cardName: '',
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: 'auto', fontSize: '22px' }} id={PageIDs.addPayment}>
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

const App = () => (
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
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <h3 style={{ fontSize: '28px' }}>Settings</h3>
              <h6 style={{ fontSize: '24px' }}>Payment</h6>
            </div>
            {/* Your existing content */}
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default App;
