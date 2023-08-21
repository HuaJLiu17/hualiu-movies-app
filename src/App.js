import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [showNCMovies, setShowNCMovies] = useState(false);
  const [showKRMovies, setShowKRMovies] = useState(false);
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const accessToken = 'e9d90bba-a993-4ced-bb15-e33bafcfe537';

  const toggleNCMovies = () => {
    setShowNCMovies(!showNCMovies);
  };
  const toggleKRMovies = () => {
    setShowKRMovies(!showKRMovies);
  };

  // Fetch actors and movies data from APIs
  useEffect(() => {
    const fetchActors = async () => {
      const response = await fetch(
        'https://switch-yam-equator.azurewebsites.net/api/actors',
        {
          headers: {
            'x-chmura-cors': accessToken,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setActors(data);
    };

    const fetchMovies = async () => {
      const response = await fetch(
        'https://switch-yam-equator.azurewebsites.net/api/movies',
        {
          headers: {
            'x-chmura-cors': accessToken,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setMovies(data);
    };

    fetchActors();
    fetchMovies();
  }, []);

  const actorMap = new Map();
  actors.forEach((actor) => {
    actorMap.set(actor.actorId, actor.name);
  });

  // Replace actor IDs with actor names in the movie array
  const moviesWithActorNames = movies.map((movie) => ({
    ...movie,
    actors: movie.actors.map((actorId) => actorMap.get(actorId)),
  }));

  console.log(moviesWithActorNames);

  return (
    <div>
      <h1 className="title">Movies with Nicholas Cage and/or Keanu Reeves</h1>
      <h2 className="title">by Hua Liu</h2>
      <div className="movies">
        <div>
          <button className="nicolas" onClick={toggleNCMovies}>
            Show Movies with Nicolas Cage
          </button>
          {showNCMovies && (
            <div>
              {moviesWithActorNames.map((movie) =>
                movie.actors.includes('Nicolas Cage') ? (
                  <div key={movie.movieId}>
                    <strong>Movie Title:</strong> {movie.title}{' '}
                    <strong>Actors:</strong>
                    {movie.actors.join(', ')}
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
        <div>
          <button className="keanu" onClick={toggleKRMovies}>
            Show Movies with Keanu Reeves
          </button>
          {showKRMovies && (
            <div>
              {moviesWithActorNames.map((movie) =>
                movie.actors.includes('Keanu Reeves') ? (
                  <div key={movie.movieId}>
                    <strong>Movie Title:</strong> {movie.title}{' '}
                    <strong>Actors:</strong>
                    {movie.actors.join(', ')}
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
