import { useState } from 'react';
import ImageCard from './ImageCard';
import ConfirmationMessage from './ConfirmationMessage';
import PropTypes from 'prop-types';

/**
 * Component that manages and displays a collection of image cards, allowing users to favorite or unfavorite items.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.results - Array of media items fetched from an API.
 * @param {Object} props.favorites - An object containing the user's favorited media items, keyed by URL.
 * @param {Function} props.setFavorites - Function to update the favorites state.
 * @param {string} props.page - Indicates the current page or view, used to determine the content to display.
 * @returns {JSX.Element} - A container that displays image cards and a confirmation message based on user actions.
 */
function ImagesContainer({ results, favorites, setFavorites, page }) {
  /**
   * State for storing the confirmation message after an action.
   * @const {string} confirmationMessage - Message displayed in the confirmation message component.
   */
  const [confirmationMessage, setConfirmationMessage] = useState('');
  /**
   * State for determining the type of confirmation message (e.g., 'success', 'error').
   * @const {string} confirmationType - Type of the confirmation message to style it accordingly.
   */
  const [confirmationType, setConfirmationType] = useState('');

  /**
   * Toggles the favorite status of a media item and updates the confirmation message.
   * @param {string} url - The URL of the media item to toggle.
   */
  function toggleFavorite(url) {
    const updatedFavorites = { ...favorites };

    if (updatedFavorites[url]) {
      delete updatedFavorites[url];
      setConfirmationMessage('Removed from favorites!');
      setConfirmationType('error');
    } else {
      const itemToAdd = results.find((result) => result.url === url);
      if (itemToAdd) {
        updatedFavorites[url] = itemToAdd;
        setConfirmationMessage('Added to favorites!');
        setConfirmationType('success');
      }
    }
    setFavorites(updatedFavorites);

    // Store updated favorites in local storage.
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  return (
    <div className='images-container'>
      {confirmationMessage && (
        <ConfirmationMessage message={confirmationMessage} className={confirmationType} />
      )}
      {(page === 'results' ? results : Object.values(favorites)).map((result) => (
        <ImageCard
          key={result.url}
          result={result}
          isFavorite={!!favorites[result.url]}
          toggleFavorite={() =>
            toggleFavorite(result.url, favorites, results, setFavorites)
          }
        />
      ))}
    </div>
  );
}

ImagesContainer.propTypes = {
  results: PropTypes.array.isRequired,
  favorites: PropTypes.object.isRequired,
  setFavorites: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

export default ImagesContainer;
