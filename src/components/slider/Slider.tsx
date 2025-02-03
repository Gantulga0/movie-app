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
    <div className="mt-20">
      <div className="lg:hidden">
        <Carousel className="w-screen flex flex-col p-0 ">
          <CarouselContent>
            {nowPlayingMoviesData.slice(0, 10).map((movie) => (
              <CarouselItem key={movie.id}>
                <Card>
                  <CardContent className="flex  justify-center p-0">
                    <div className="">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        width={1000}
                        height={250}
                        alt="Picture of the author"
                        className="h-[247px] object-cover"
                      />
                      <div className="p-5">
                        <div className="flex justify-between">
                          <div>
                            <p>Now playing:</p>
                            <h3 className="font-semibold text-2xl">
                              {movie.title}
                            </h3>
                          </div>
                          <div className="flex gap-1 items-center">
                            <Star className="text-yellow-400 w-7 h-7 fill-yellow-400" />
                            {movie.vote_average}/10
                          </div>
                        </div>
                        <div>
                          <p className="font-normal text-sm leading-5 my-4 h-[100px] overflow-hidden overflow-y-auto">
                            {movie.overview}
                          </p>
                        </div>
                        <Button>Watch trailer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden lg:block">
        <Carousel className="w-screens max-h-[600px] flex flex-col p-0 ">
          <CarouselContent>
            {nowPlayingMoviesData.slice(0, 10).map((movie) => (
              <CarouselItem key={movie.id}>
                <div>
                  <Card>
                    <CardContent className="p-0 h-[700px]">
                      <div className="">
                        <Image
                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                          width={2500}
                          height={750}
                          alt="Picture of the movie"
                          className="absolute object-cover h-[700px]"
                        />

                        <div className="p-5 relative top-0 left-0 min-h-[500px] w-screen flex flex-col justify-center ml-40 gap-4">
                          <div className="gap-4">
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
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-10 top-1/2 transform -translate-y-1/2 z-100" />
          <CarouselNext className="absolute right-10 top-1/2 transform -translate-y-1/2 z-100" />
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
