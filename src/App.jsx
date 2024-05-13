import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ImagesContainer from './components/ImagesContainer';
import Loader from './components/Loader';

const NASA_API = {
  count: 10,
  apiKey: 'DEMO_KEY',
  apiUrl: `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10`,
};

function App() {
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('results');

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      try {
        const response = await fetch(NASA_API.apiUrl);
        const data = await response.json();
        setResults(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className='container'>
      {loading && <Loader />}
      <Navigation page={page} setPage={setPage} />
      <ImagesContainer
        results={results}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </div>
  );
}

export default App;
