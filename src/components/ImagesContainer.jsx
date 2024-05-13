import ImageCard from './ImageCard';

function ImagesContainer({ results, favorites, setFavorites, page }) {
  function toggleFavorite(url) {
    const updatedFavorites = { ...favorites };
    if (updatedFavorites[url]) {
      delete updatedFavorites[url];
    } else {
      const itemToAdd = results.find((result) => result.url === url);
      if (itemToAdd) {
        updatedFavorites[url] = itemToAdd;
      }
    }
    setFavorites(updatedFavorites);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  return (
    <div className='images-container'>
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

export default ImagesContainer;
