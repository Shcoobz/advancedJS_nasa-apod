import PropTypes from 'prop-types';

/**
 * Renders the navigation bar for the application, allowing users to switch between results and favorites views or trigger more content to load.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.page - The current page state, either 'results' or 'favorites'.
 * @param {Function} props.setPage - Function to set the current page state.
 * @param {Function} props.loadMoreImages - Function to load more images from the external source.
 * @returns {JSX.Element} - A navigation component with interactive elements to control application views and actions.
 */
function Navigation({ page, setPage, loadMoreImages }) {
  return (
    <div className='navigation-container'>
      <span className='background'></span>
      <span
        className='navigation-items'
        id={page === 'results' ? 'resultsNav' : 'favoritesNav'}>
        {page === 'results' ? (
          <>
            <h3 className='clickable' onClick={() => setPage('favorites')}>
              Favorites
            </h3>
            <h3>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</h3>
            <h3 className='clickable' onClick={loadMoreImages}>
              Load More
            </h3>
          </>
        ) : (
          <h3 className='clickable' onClick={loadMoreImages}>
            Load More NASA Images
          </h3>
        )}
      </span>
    </div>
  );
}

Navigation.propTypes = {
  page: PropTypes.oneOf(['results', 'favorites']).isRequired,
  setPage: PropTypes.func.isRequired,
  loadMoreImages: PropTypes.func.isRequired,
};

export default Navigation;
