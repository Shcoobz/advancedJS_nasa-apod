import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

function ImageCard({ result, isFavorite, toggleFavorite }) {
  return (
    <div className='card'>
      <a
        href={result.hdurl}
        title='View Full Image'
        target='_blank'
        rel='noopener noreferrer'>
        {result.media_type === 'image' ? (
          <img src={result.url} alt={result.title} className='card-img-top' />
        ) : (
          <iframe
            src={result.url}
            title='NASA Video of the Day'
            className='card-img-top video-frame'
            style={{ width: '100%', height: '500px' }}
            allowFullScreen></iframe>
        )}
      </a>
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
    </div>
  );
}

export default ImageCard;
