import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Represents an image card displaying details of a NASA media item. Allows toggling of favorite status.
 * @param {Object} props - Component properties.
 * @param {Object} props.result - The media item's data.
 * @param {string} props.result.media_type - Type of media ('image' or 'video').
 * @param {string} props.result.url - URL of the media item.
 * @param {string} props.result.hdurl - URL of the high-definition image.
 * @param {string} props.result.title - Title of the media item.
 * @param {string} props.result.explanation - Description of the media item.
 * @param {string} props.result.date - Date of the media item.
 * @param {string} [props.result.copyright] - Copyright information of the media item.
 * @param {boolean} props.isFavorite - Indicates whether the item is marked as a favorite.
 * @param {Function} props.toggleFavorite - Function to toggle the favorite status of the item.
 * @returns {JSX.Element} - A card component that displays the media item and allows it to be favorited.
 */
function ImageCard({ result, isFavorite, toggleFavorite }) {
  /**
   * Determines the media content based on the type of media and generates appropriate JSX for it.
   * @const {JSX.Element} mediaContent - JSX content for the media item, either an image or a video frame.
   */
  const mediaContent =
    result.media_type === 'image' ? (
      <img src={result.url} alt={result.title} className='card-img-top' />
    ) : (
      <iframe
        src={result.url}
        title='NASA Video of the Day'
        className='card-img-top video-frame'
        style={{ width: '100%', height: '500px' }}
        allowFullScreen></iframe>
    );

  /**
   * JSX for the card body, including the title, favorite icon, explanation, and copyright/date information.
   * @const {JSX.Element} cardBodyContent - The body section of the card.
   */
  const cardBodyContent = (
    <div className='card-body'>
      <div className='title-icon-container'>
        <h5 className='card-title'>{result.title}</h5>
        <span onClick={() => toggleFavorite(result.url)} className='clickable'>
          <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
        </span>
      </div>
      <p>{result.explanation}</p>
      <small className='text-muted'>
        <strong>{result.date}</strong> {result.copyright && `© ${result.copyright}`}
      </small>
    </div>
  );

  return (
    <div className='card'>
      <a
        href={result.hdurl}
        title='View Full Image'
        target='_blank'
        rel='noopener noreferrer'>
        {mediaContent}
      </a>
      {cardBodyContent}
    </div>
  );
}

ImageCard.propTypes = {
  result: PropTypes.shape({
    media_type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    hdurl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    copyright: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default ImageCard;
