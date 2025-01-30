import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '@/types/movie-type';

const PopularMovie = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [popularMoviesData, setPopularMoviesData] = useState<Movie[]>();

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const API_TOKEN = process.env.API_TOKEN;

  useEffect(() => {
    const getMovieData = async () => {
      try {
        setLoading(true);
        const popularResponse = await axios.get(
          `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        setPopularMoviesData(popularResponse.data.results);
        console.log('This is popular:', popularResponse.data.results);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.status_message || 'API error');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    getMovieData();
  }, []);

  return (
    <div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {popularMoviesData ? (
        <ul>
          {popularMoviesData.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>No popular movies available.</p>
      )} */}
    </div>
  );
};

export default PopularMovie;
