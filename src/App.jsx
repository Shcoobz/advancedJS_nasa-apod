import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ImagesContainer from './components/ImagesContainer';
import Loader from './components/Loader';
import ConfirmationMessage from './components/ConfirmationMessage';

/**
 * Configuration for accessing the NASA API.
 * @const {Object} NASA_API - Holds the base configuration for fetching data from NASA's API.
 * @property {number} count - Number of images to fetch in a single request.
 * @property {string} apiKey - API key for authentication with NASA API, here set to 'DEMO_KEY'.
 * @property {Function} apiUrl - Computed property that returns the full API URL for fetching images.
 */
const NASA_API = {
  count: 10,
  apiKey: 'DEMO_KEY',
  get apiUrl() {
    return `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&count=${this.count}`;
  },
};

/**
 * Main component that represents the whole app.
 * @returns {JSX.Element} - The rendered component.
 */
function App() {
  /**
   * Holds the results from the API fetch.
   * @const {Array} results - State variable that stores the images fetched from NASA API.
   */
  const [results, setResults] = useState([]);
  /**
   * Stores user's favorite images.
   * @const {Object} favorites - State variable that keeps track of the user's favorited images.
   */
  const [favorites, setFavorites] = useState({});
  /**
   * Indicates whether the app is currently loading data.
   * @const {boolean} loading - State variable that shows if the app is in the loading state.
   */
  const [loading, setLoading] = useState(false);
  /**
   * Manages which page/view is currently active.
   * @const {string} page - State variable to control the displayed page.
   */
  const [page, setPage] = useState('results');
  /**
   * Holds any errors that occur during the API fetch.
   * @const {string} error - State variable that stores error messages from fetch operations.
   */
  const [error, setError] = useState('');

  /**
   * Effect hook that initializes the application state. It loads favorites from local storage and fetches images when the component mounts.
   */
  useEffect(() => {
    /**
     * Attempts to load the user's favorited images from local storage.
     */
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));

    /**
     * If there are saved favorites, updates the favorites state with these values.
     */
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }

    /**
     * Calls fetchImages to load images from the NASA API as soon as the component mounts.
     */
    fetchImages();
  }, []);

  /**
   * Asynchronously fetches images from the NASA API.
   * @async
   * @returns {Promise<void>} - No return value but updates state on completion.
   */
  async function fetchImages() {
    setLoading(true);

    try {
      const response = await fetch(NASA_API.apiUrl);
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests, try again later!');
        } else {
          throw new Error(`Failed to fetch images: ${response.status}`);
        }
      }
      const data = await response.json();
      setResults(data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Function to load more images and set the page to results.
   * Invokes fetching of images and scrolls to the top of the page.
   */
  function loadMoreImages() {
    fetchImages();
    setPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className='container'>
      {loading && <Loader />}
      {error && <ConfirmationMessage message={error} className='error' />}
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
