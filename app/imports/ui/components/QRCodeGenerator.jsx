import React, { useState, useEffect } from 'react';
import qrcode from 'qrcode';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';

const QRCodeGenerator = () => {
  const [qrCode, setQRCode] = useState('');

  useEffect(() => {
    const userId = Meteor.user();

    if (userId) {
      // Extract the user's email from the Meteor user object
      const userQrText = userId.emails[0].address;

      // Use the toDataURL method from the qrcode library
      qrcode.toDataURL(userQrText, (err, dataUrl) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          return;
        }
        setQRCode(dataUrl);
      });
    } else {
      setQRCode('');
    }
  }, []);

  return (
    <Container>
      <h1 className="text-center py-3">User QR Code</h1>

      <Container id="generate-qr" className="d-flex justify-content-center align-items-center">
        <Container id="qrcode" className="col-lg-4">
          {qrCode && <img src={qrCode} alt="QR Code" width="100%" />}
        </Container>
      </Container>
    </Container>
  );
};

export default QRCodeGenerator;
