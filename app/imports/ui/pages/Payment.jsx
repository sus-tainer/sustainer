import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const App = () => {
  // State to manage the form inputs
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [savedCards, setSavedCards] = useState([]);

  // Function to handle the form submission
  const handleAddCard = () => {
    const newCard = {
      cardholderName,
      cardNumber,
      expirationDate,
      cvv,
    };

    // Update the state to include the new card
    setSavedCards([...savedCards, newCard]);

    // Clear the form fields after adding the card
    setCardholderName('');
    setCardNumber('');
    setExpirationDate('');
    setCVV('');
  };

  // Function to handle the removal of a card
  const handleRemoveCard = (index) => {
    setSavedCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };

  return (
    <Container
      className="py-5"
      fluid
      style={{
        background: 'url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp) no-repeat center center fixed',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <Row className="d-flex justify-content-center">
        <Col md="10" lg="8" xl="5">
          <Card className="rounded-3">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3>Settings</h3>
                <h6>Payment</h6>
              </div>
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
                  type="text"
                  size="lg"
                  placeholder="Cardholder Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-outline">
                <Form.Control
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
