import ImageCard from './ImageCard';

function ImagesContainer({ results, favorites, setFavorites }) {
  function toggleFavorite(url, favorites, results, setFavorites) {
    const updatedFavorites = { ...favorites };
    if (updatedFavorites[url]) {
      delete updatedFavorites[url];
    } else {
      updatedFavorites[url] = results.find((result) => result.url === url);
    }
    setFavorites(updatedFavorites);

    // TODO: save to local storage
  }

  return (
    <div className='images-container'>
      {results.map((result) => (
        <ImageCard
          key={result.url}
          result={result}
          isFavorite={!!favorites[result.url]}
          toggleFavorite={() => toggleFavorite(result.url)}
        />
      ))}
    </div>
  );
}

export default ImagesContainer;
