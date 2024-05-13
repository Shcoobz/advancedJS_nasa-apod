/**
 * Displays a visual indicator (loader) to inform users that an operation is in progress.
 * @returns {JSX.Element} - A simple loader component with an animated image to indicate loading.
 */
function Loader() {
  return (
    <div className='loader'>
      <img src='img/rocket.svg' alt='Loading...' />
    </div>
  );
}

export default Loader;
