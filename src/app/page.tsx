'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
      <Carousel className="w-full">
        <CarouselContent className="h-[600px]">
          {popularMoviesData.length > 0 ? (
            popularMoviesData.map(
              (movie: {
                id: number;
                title: string;
                poster_path: string;
                backdrop_path: string;
                overview: string;
              }) => (
                <CarouselItem key={movie.id} className="h-full">
                  <div className="h-full">
                    <Card className="h-full">
                      <CardContent className="flex items-center justify-center h-full">
                        {movie.backdrop_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full object-cover"
                          />
                        ) : (
                          <div>No image available</div>
                        )}
                      </CardContent>
                      <CarouselNext />
                      <CarouselPrevious />
                    </Card>
                  </div>
                </CarouselItem>
              )
            )
          ) : !loading ? (
            <p>No movies found.</p>
          ) : null}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
