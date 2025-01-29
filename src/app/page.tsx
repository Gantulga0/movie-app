'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popularMoviesData, setPopularMoviesData] = useState([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setPopularMoviesData(response.data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };
  console.log(popularMoviesData);

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {popularMoviesData.length > 0
          ? popularMoviesData.map((movie: { id: number; title: string }) => (
              <li key={movie.id}>{movie.title}</li>
            ))
          : !loading && <p>No movies found.</p>}
      </ul>
    </div>
  );
}
