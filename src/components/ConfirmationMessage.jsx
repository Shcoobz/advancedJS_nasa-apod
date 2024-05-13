import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ConfirmationMessage({ message }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div className={`confirmation-message ${isVisible ? 'visible' : 'hidden'}`}>
      <h1 id='confirmationText'>{message}</h1>
    </div>
  );
}

ConfirmationMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ConfirmationMessage;
