import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function ImageCard({ result, isFavorite, toggleFavorite }) {
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
