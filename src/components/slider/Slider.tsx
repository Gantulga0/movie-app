import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Movie } from '@/types/movie-type';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';

const Slider: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState<Movie[]>([]);

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const API_TOKEN = process.env.API_TOKEN;

  const getMovieData = async () => {
    try {
      setLoading(true);
      const nowPlayingResponse = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setNowPlayingMoviesData(nowPlayingResponse.data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message || 'Error fetching data');
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
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 font-bold">Error: {error}</p>}

      <Carousel className="w-full relative">
        <CarouselContent className="lg:h-[600px] max-lg:h-[250px]">
          {nowPlayingMoviesData.length > 0 ? (
            nowPlayingMoviesData.map((movie) => (
              <CarouselItem key={movie.id} className="h-full">
                <div className="h-full relative ">
                  <Card className="h-full">
                    <CardContent className="flex items-center justify-center h-full relative">
                      <div className="flex flex-col">
                        <Image
                          src={`${process.env.TMDB_IMAGE_SERVICE_URL}/w1280/${movie.backdrop_path}`}
                          alt={movie.title}
                          className="object-cover"
                          sizes="(max-width: 1280px) 100vw, 33vw"
                          fill={true}
                          quality={100}
                        />
                        <div className="lg:flex lg:flex-col lg:left-36 lg:absolute lg:max-w-[400px] lg:max-h-[264px] lg:p-4 lg:text-white lg:overflow-hidden lg:gap-4 ">
                          <div className="gap-3">
                            <h1 className="text-base font-bold">
                              Now Playing:
                            </h1>
                            <h2 className="text-2xl font-bold tracking-tight truncate">
                              {movie.title}
                            </h2>

                            <h2 className="text-base font-bold flex">
                              <Star className="text-yellow-400" />
                              {movie.vote_average} /10
                            </h2>
                          </div>
                          <p className="text-sm font-normal line-clamp-5 w-[302px]">
                            {movie.overview}
                          </p>
                          <Button
                            variant="secondary"
                            className="gap-2 h-10 w-[140px]"
                          >
                            Watch Trailer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          ) : !loading ? (
            <p>No movies found.</p>
          ) : null}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default Slider;
