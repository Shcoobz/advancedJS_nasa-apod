import { useState } from 'react';

function ConfirmationMessage() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  function showMessage(msg, setMessage, setVisible) {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  }

  return visible ? (
    <div className='confirmation-message'>
      <h1>{message}</h1>
    </div>
  ) : null;
}

export default ConfirmationMessage;
