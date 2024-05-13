import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A functional component that displays a confirmation message which auto-hides after a specified duration.
 * @param {Object} props - Component props.
 * @param {string} props.message - The message to be displayed. It is required.
 * @param {string} [props.className] - Optional additional CSS class to style the component.
 * @returns {JSX.Element} - A styled confirmation message that appears based on the `isVisible` state.
 */
function ConfirmationMessage({ message, className }) {
  /**
   * State to manage the visibility of the confirmation message.
   * @const {boolean} isVisible - A boolean state that determines if the message is visible or not.
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Effect hook that sets visibility to true when a message is present and sets a timer to hide the message after 2000 milliseconds.
   * Cleans up by clearing the timeout when the component unmounts or the message changes.
   */
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
    <div
      className={`confirmation-message ${isVisible ? 'visible' : 'hidden'} ${className}`}>
      <h1 id='confirmationText'>{message}</h1>
    </div>
  );
}

ConfirmationMessage.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ConfirmationMessage;
