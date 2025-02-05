'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '@/types/movie-type';
import Image from 'next/image';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

import { ChevronRight, X, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [genreList, setGenreList] = useState<any[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const API_TOKEN = process.env.API_TOKEN;

  const router = useRouter();

  const getGenreData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setGenreList(response.data.genres);
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

  const getMoviesByGenre = async (genreId: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreId}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setMovieList(response.data.results);
      setTotalPages(response.data.total_pages);
      console.log(response.data);
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

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(Number(genreId));
    setCurrentPage(1);
  };

  const createPageArray = (totalPages: number, currentPage: number) => {
    const pages: (number | string)[] = [];

    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }
    pages.push(currentPage);
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    return pages;
  };

  const pageNumbers = createPageArray(totalPages, currentPage);

  useEffect(() => {
    getGenreData();
  }, []);

  useEffect(() => {
    if (selectedGenre !== null) {
      getMoviesByGenre(selectedGenre);
    }
  }, [selectedGenre, currentPage]);
  const handleMovieClick = (movieId: number) => {
    router.push(`/detail/${movieId}`);
  };

  return (
    <div>
      <div className="m-5 flex justify-between max-w-[1280px] mx-auto pt-14 pr-5 pl-5 mt-16">
        {!loading && !error && genreList.length > 0 && (
          <div className="w-[387px]">
            <h1 className="text-3xl font-bold mb-10">Search Filter</h1>

            <h1 className="font-bold text-2xl">Genres</h1>
            <h2 className="text-base font-bold mb-5 mt-2">
              See list of movies by genre
            </h2>
            {genreList.map((genre) => (
              <Badge
                key={genre.id}
                variant={'outline'}
                className="mr-4 mb-4 cursor-pointer"
                onClick={() => handleGenreSelect(genre.id.toString())}
              >
                {genre.name}
                <ChevronRight className="stroke-1" />
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pt-9">
          {movieList.map((movie) => (
            <Card
              key={movie.id}
              className="w-full max-w-[150px] mx-auto cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            >
              <CardHeader className="p-0">
                <Image
                  src={`${process.env.TMDB_IMAGE_SERVICE_URL}/w1280/${movie.poster_path}`}
                  alt={movie.title}
                  className="object-cover rounded"
                  width={250}
                  height={350}
                  quality={100}
                />
              </CardHeader>
              <CardFooter className="flex flex-col p-2 items-start ">
                <div className="flex items-center gap-x-1">
                  <Star className="text-yellow-400 w-4 fill-yellow-400" />
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
      </div>
      <Pagination className="mt-[32px] flex justify-end">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
          )}

          {pageNumbers.map((page, index) => {
            const key = `${page}-${index}`;
            if (page === '...') {
              return (
                <PaginationItem key={key}>
                  <PaginationLink href="#">...</PaginationLink>
                </PaginationItem>
              );
            } else {
              return (
                <PaginationItem key={key}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page as number)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Page;
