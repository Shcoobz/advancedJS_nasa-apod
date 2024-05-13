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

export default Navigation;
