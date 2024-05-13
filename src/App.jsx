import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ImagesContainer from './components/ImagesContainer';
import Loader from './components/Loader';

const NASA_API = {
  count: 10,
  apiKey: 'DEMO_KEY',
  get apiUrl() {
    return `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&count=${this.count}`;
  },
};

function App() {
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('results');

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));

    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    setLoading(true);

    try {
      const response = await fetch(NASA_API.apiUrl);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  }

  function loadMoreImages() {
    fetchImages();
    setPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className='container'>
      {loading && <Loader />}
      <Navigation page={page} setPage={setPage} loadMoreImages={loadMoreImages} />
      <ImagesContainer
        results={results}
        favorites={favorites}
        setFavorites={setFavorites}
        page={page}
      />
    </div>
  );
}

export default App;
