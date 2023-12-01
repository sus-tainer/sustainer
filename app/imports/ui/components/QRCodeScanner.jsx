import React, { useEffect, useState, useRef } from 'react';
import ZXing from '@zxing/library';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import LoadingSpinner from './LoadingSpinner';

const useCodeReader = () => useRef(new ZXing.BrowserQRCodeReader());

const QrCodeScanner = () => {
  const codeReaderRef = useCodeReader();
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    const initCodeReader = async () => {
      try {
        const codeReader = new ZXing.BrowserQRCodeReader();
        console.log('ZXing code reader initialized');

        const videoInputDevices = await codeReader.getVideoInputDevices();
        setSelectedDeviceId(videoInputDevices[0]?.deviceId);

        if (videoInputDevices.length >= 1) {
          const sourceSelect = document.getElementById('sourceSelect');
          videoInputDevices.forEach((element) => {
            const sourceOption = document.createElement('option');
            sourceOption.text = element.label;
            sourceOption.value = element.deviceId;
            sourceSelect.appendChild(sourceOption);
          });

          sourceSelect.onchange = () => {
            setSelectedDeviceId(sourceSelect.value);
          };

          const sourceSelectPanel = document.getElementById('sourceSelectPanel');
          sourceSelectPanel.style.display = 'block';
        }

        document.getElementById('startButton').addEventListener('click', () => {
          // eslint-disable-next-line no-unused-vars
          const decodingStyle = document.getElementById('decoding-style');
          // eslint-disable-next-line no-use-before-define
          decodeContinuously(codeReaderRef.current, selectedDeviceId);
        });

        document.getElementById('resetButton').addEventListener('click', () => {
          codeReaderRef.current.reset();
          document.getElementById('result').textContent = '';
          console.log('Reset.');
        });

      } catch (error) {
        console.error(error);
      }
    };

    initCodeReader();
  }, [selectedDeviceId]);

  // eslint-disable-next-line no-shadow
  const decodeContinuously = (codeReader, selectedDeviceId) => {
    // eslint-disable-next-line no-shadow
    codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, 'video', (result, err) => {
      if (result) {
        console.log('Found QR code!', result);
        setResult(result.text);
        document.getElementById('result').textContent = result.text;
      }

      if (err) {
        if (err instanceof ZXing.NotFoundException) {
          console.log('No QR code found.');
        }

        if (err instanceof ZXing.ChecksumException) {
          console.log('A code was found, but its read value was not valid.');
        }

        if (err instanceof ZXing.FormatException) {
          console.log('A code was found, but it was in an invalid format.');
        }
      }
    });
  };

  const [selection, setSelection] = useState('container');

  const submit = (scanned) => {
    console.log(selection);
    if (scanned !== null) {
      swal('Successful Return', 'Assigned container back to: ZWO', 'success');
    } else {
      swal('Error', 'Please scan a container', 'error');
    }
  };

  const handleOnClick = () => {
    submit(selection);
    codeReaderRef.current.reset();
    document.getElementById('result').textContent = '';
  };

  const handleSelectionChange = (e) => {
    setSelection(e.currentTarget.value);
  };

  if (!ZXing) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-1 justify-content-center align-content-center">
      <Row className="justify-content-center">
        <Col sm={3} md={4} lg={4} xl={4}>
          <Container className="py-2">
            <Row className="py-1 d-flex">
              <Col className="d-flex justify-content-center align-items-center">
                <Button className="button" id="startButton">Start</Button>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <Button className="button" id="resetButton">Reset</Button>
              </Col>
            </Row>
            <Row className="py-1">
              <Form.Select aria-label="Default select example" value={selection} onChange={handleSelectionChange}>
                <option value="container">Scan Container</option>
                <option value="user">Scan User</option>
              </Form.Select>
            </Row>
          </Container>

          <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video id="video" width="300" height="200" style={{ border: '1px solid gray' }} />
            </div>
          </Container>

          <Container className="py-2">
            <div id="sourceSelectPanel" style={{ display: 'none' }}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="sourceSelect">Video Source:</label>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <select id="sourceSelect" style={{ maxWidth: '400px' }} />
            </div>
          </Container>

          <Container>
            <h3>Result:</h3>
            <pre><code id="result" /></pre>
            <div className="d-flex justify-content-center align-items-center">
              <Button value={selection} onClick={handleOnClick}>Scan</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default QrCodeScanner;
