import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '@/types/movie-type';

const UpComingMovie = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [upComingMovie, setUpComingMovie] = useState<Movie[]>();

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const API_TOKEN = process.env.API_TOKEN;

  const getMovieData = async () => {
    try {
      setLoading(true);
      const upcomingResponse = await axios.get(
        `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setUpComingMovie(upcomingResponse.data.results);
      console.log('This is upcoming:', upcomingResponse.data.results);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message || 'API error');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {upComingMovie ? (
        <ul>
          {upComingMovie.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>No upcoming movies available.</p>
      )} */}
    </div>
  );
};

export default UpComingMovie;
