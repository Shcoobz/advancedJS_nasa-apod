import { useEffect } from 'react';

function ConfirmationMessage({ message }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
    }, 2000);
  }, []);

  return (
    <div className='confirmation-message'>
      <h1>{message}</h1>
    </div>
  );
}

export default ConfirmationMessage;
