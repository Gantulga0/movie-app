'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '@/types/movie-type';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Star } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

const SimilarMoviesPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [similarMoviesData, setSimilarMoviesData] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const API_TOKEN = process.env.API_TOKEN;

  const getSimilarMovies = async (movieId: string, page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/similar?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setTotalPages(response.data.total_pages);
      setSimilarMoviesData(response.data.results);
    } catch (err) {
      console.error('Error fetching similar movies:', err);
      setError('An error occurred while fetching similar movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      console.log('Fetching similar movies for movieId:', id);
      getSimilarMovies(id as string, currentPage);
    }
  }, [id, currentPage]);

  const createPageArray = (totalPages: number, currentPage: number) => {
    const pages: (number | string)[] = [];
    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages) pages.push(currentPage + 1);
    if (currentPage < totalPages - 2) pages.push('...');
    return pages;
  };

  const pageNumbers = createPageArray(totalPages, currentPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== currentPage) setCurrentPage(pageNumber);
  };
  const handleMovieClick = (movieId: number) => {
    router.push(`/detail/${movieId}`);
  };

  return (
    <div className="m-5 flex flex-col justify-between max-w-[1280px] mx-auto pt-14 pr-5 pl-5 mt-20">
      <h3 className="font-inter text-[24px] font-semibold">Similar Movies</h3>
      {loading && <p>Loading similar movies...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pt-9">
        {similarMoviesData.map((movie) => (
          <Card
            key={movie.id}
            className="w-full max-w-[200px] mx-auto"
            onClick={() => handleMovieClick(movie.id)} // Clicking on the card will trigger navigation
          >
            <CardHeader className="p-0">
              <Image
                src={
                  movie.poster_path
                    ? `${process.env.TMDB_IMAGE_SERVICE_URL}/w500/${movie.poster_path}`
                    : '/default-image.jpg'
                }
                alt={movie.title || 'Movie Poster'}
                className="object-cover rounded"
                width={250}
                height={350}
              />
            </CardHeader>
            <CardFooter className="flex flex-col p-2 items-start">
              <div className="flex items-center gap-x-1">
                <Star className="text-yellow-400 w-4 fill-yellow-400" />
                <p className="text-sm">{movie.vote_average}</p>
                <p className="text-muted-foreground text-xs pt-[2px]">/10</p>
              </div>
              <div className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                {movie.title}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-[32px] flex justify-end">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
            )}

            {pageNumbers.map((page, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page as number)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SimilarMoviesPage;
