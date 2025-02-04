'use client';

import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Movie } from '@/types/movie-type';
const page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [movieGenreList, setMovieGenreList] = useState<Movie[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const API_TOKEN = process.env.API_TOKEN;

  const getMovieData = async (page: number) => {
    try {
      setLoading(true);
      const popularResponse = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      console.log(popularResponse.data.results);
      setTotalPages(popularResponse.data.total_pages);
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
  return <div></div>;
};

export default page;
