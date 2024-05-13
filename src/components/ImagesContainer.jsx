function ImagesContainer({ page, results, favorites, setFavorites }) {
  const currentArray = page === 'results' ? results : Object.values(favorites);

  return (
    <div className='images-container'>
      {currentArray.map((result) => (
        <div key={result.url} className='card'></div>
      ))}
    </div>
  );
}

export default ImagesContainer;
