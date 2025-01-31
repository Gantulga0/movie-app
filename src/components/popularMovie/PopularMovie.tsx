import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '@/types/movie-type';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const firstTenMovies = popularMoviesData?.slice(0, 10);

  return (
    <div className="m-5 flex flex-col justify-between max-w-[1280px] mx-auto pt-8 pr-5 pl-5">
      <div className="flex justify-between">
        <h3 className="font-inter text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
          Popular
        </h3>
        <Button variant="link" className="font-inter text-sm font-semibold">
          See more
          <ArrowRight />
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {firstTenMovies && firstTenMovies.length > 0 ? (
        <div className="flex flex-wrap gap-5 pt-9">
          {firstTenMovies.map((movie) => (
            <Card key={movie.id} className="mb-4 w-[230px]">
              <CardHeader>
                <CardTitle>
                  <Image
                    src={`${process.env.TMDB_IMAGE_SERVICE_URL}/w200/${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover"
                    width={200}
                    height={350}
                    quality={100}
                  />
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex flex-col">
                <div className="flex items-center gap-x-1">
                  <Star className="text-yellow-400 w-4" />
                  <p className="text-sm leading-5 font-medium">
                    {movie.vote_average}
                  </p>
                  <p className="text-muted-foreground text-xs pt-[2px]">/10</p>
                </div>
                <div className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                  {movie.title}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>No upcoming movies available.</p>
      )}
    </div>
  );
};

export default PopularMovie;
