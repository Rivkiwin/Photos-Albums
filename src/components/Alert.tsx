import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';

function AlertPop({ message, type }: { message: string, type: 'success' | 'danger' }) {
  const [show, setShow] = useState(true);
  console.log('ggg');

  if (show) {
    return (
      <Alert key={type} variant={type} onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    );
  }
  else return <></>
}

export default AlertPop