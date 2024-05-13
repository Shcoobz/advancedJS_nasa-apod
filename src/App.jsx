import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ImagesContainer from './components/ImagesContainer';
import Loader from './components/Loader';
import ConfirmationMessage from './components/ConfirmationMessage';
import { NASA_API } from './constants';

function App() {
  const [page, setPage] = useState('results');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNasaPictures();
  }, []);

  const getNasaPictures = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${NASA_API.apiUrl}&count=${NASA_API.count}`);
      const data = await response.json();
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch NASA pictures:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <Navigation page={page} setPage={setPage} />
      <ImagesContainer
        page={page}
        results={results}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <ConfirmationMessage />
    </div>
  );
}

export default App;
