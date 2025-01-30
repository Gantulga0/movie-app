'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from '@/components/slider/Slider';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState([]);

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
      console.log('this is popular', popularResponse.data.results);

      const nowPlayingResponse = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setNowPlayingMoviesData(nowPlayingResponse.data.results);
      console.log('this is now playing', nowPlayingResponse.data.results);

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

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <div>
      <Slider
        loading={loading}
        error={error}
        nowPlayingMoviesData={nowPlayingMoviesData}
      />
    </div>
  );
}
