import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
}

interface SliderProps {
  loading: boolean;
  error: string | null;
  nowPlayingMoviesData: Movie[];
}

const Slider: React.FC<SliderProps> = ({
  loading,
  error,
  nowPlayingMoviesData,
}) => {
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 font-bold">Error: {error}</p>}
      <Carousel className="w-full pb-[52px]">
        <CarouselContent className="h-[600px]">
          {nowPlayingMoviesData.length > 0 ? (
            nowPlayingMoviesData.map((movie) => (
              <CarouselItem key={movie.id} className="h-full">
                <div className="h-full">
                  <Card className="h-full">
                    <CardContent className="flex items-center justify-center h-full">
                      {movie.backdrop_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                          alt={movie.title}
                          className="object-cover"
                          fill={true}
                          quality={100}
                        />
                      ) : (
                        <div>
                          <Image
                            src="/path-to-placeholder-image.jpg"
                            alt="No image available"
                            className="object-cover"
                            fill={true}
                            quality={100}
                          />
                        </div>
                      )}
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
