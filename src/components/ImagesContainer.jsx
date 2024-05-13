import { useState } from 'react';
import ImageCard from './ImageCard';
import ConfirmationMessage from './ConfirmationMessage';
import PropTypes from 'prop-types';

function ImagesContainer({ results, favorites, setFavorites, page }) {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationType, setConfirmationType] = useState('');

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
