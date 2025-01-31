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

  console.log(nowPlayingMoviesData);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 font-bold">Error: {error}</p>}
      <Carousel className="w-full pb-[52px] relative">
        <CarouselContent className="h-[600px]">
          {nowPlayingMoviesData.length > 0 ? (
            nowPlayingMoviesData.map((movie) => (
              <CarouselItem key={movie.id} className="h-full">
                <div className="h-full relative">
                  <Card className="h-full">
                    <CardContent className="flex items-center justify-center h-full relative">
                      {movie.backdrop_path ? (
                        <Image
                          src={`${process.env.TMDB_IMAGE_SERVICE_URL}/w400/${movie.backdrop_path}`}
                          alt={movie.title}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          fill={true}
                          quality={100}
                        />
                      ) : (
                        <div>No image available</div>
                      )}

                      <div className="flex flex-col left-36 absolute  max-w-[302px] p-4 text-white overflow-hidden gap-4">
                        <div className="overflow-hidden ">
                          <h1 className="text-base font-bold">Now Playing:</h1>
                          <h2 className="text-4xl font-bold">{movie.title}</h2>
                          <h2 className="text-base font-bold flex">
                            <Star className="text-yellow-400" />
                            {movie.vote_average}
                          </h2>
                        </div>
                        <p className="text-xs font-normal leading-4 w-[302px]">
                          {movie.overview}
                        </p>
                        <button className="bg-white text-black">
                          Watch Trailer
                        </button>
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Slider;
