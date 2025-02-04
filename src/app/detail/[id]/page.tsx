'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '@/types/movie-type';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [director, setDirector] = useState<string | null>(null);
  const [writers, setWriters] = useState<string[]>([]);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const { id } = useParams();

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const API_TOKEN = process.env.API_TOKEN;

  useEffect(() => {
    if (!id) return;

    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const [movieResponse, creditsResponse, similarMoviesResponse] =
          await Promise.all([
            axios.get(`${TMDB_BASE_URL}/movie/${id}?language=en-US`, {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
              },
            }),
            axios.get(`${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`, {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
              },
            }),
            axios.get(
              `${TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
              {
                headers: {
                  Authorization: `Bearer ${API_TOKEN}`,
                },
              }
            ),
          ]);

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast);

        const directorData = creditsResponse.data.crew.find(
          (member: any) => member.job === 'Director'
        );
        const writerData = creditsResponse.data.crew.filter(
          (member: any) => member.job === 'Writer'
        );

        setDirector(directorData ? directorData.name : null);
        setWriters(writerData.map((writer: any) => writer.name));
        setSimilarMovies(similarMoviesResponse.data.results);

        console.log('this is similar movie', similarMoviesResponse.data);
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

    getMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>No movie details available.</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3">
          <div className="mt-14 mb-4">
            <h2 className="text-2xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-500">
              Release Date: {movie.release_date} · {movie.runtime}
            </p>
            <p className="font-medium">Rating: {movie.vote_average}/10</p>
            <p className="font-medium">{movie.vote_count}</p>
          </div>
          <div className="bg-red-400 w-full h-[211px] mb-8"></div>
          <div className="flex gap-10">
            {movie.poster_path && (
              <Image
                src={`${process.env.TMDB_IMAGE_SERVICE_URL}/w500/${movie.poster_path}`}
                alt={movie.title}
                width={100}
                height={148}
                className="rounded h-[148px]"
              />
            )}
            <div className="sm:w-2/3 sm:mt-0">
              <div className="">
                <h3 className="font-medium text-lg">Genres:</h3>
                <ul className="flex gap-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id} variant="outline">
                      {genre.name}
                    </Badge>
                  ))}
                </ul>
              </div>
              <p className="mt-4">{movie.overview}</p>
            </div>
          </div>
        </div>

        {director && (
          <div className="mt-6 flex gap-4 items-center">
            <h3 className="text-base font-bold w-16">Director</h3>
            <p>{director}</p>
          </div>
        )}
        <hr />
        {writers.length > 0 && (
          <div className="mt-6 flex gap-4 items-center">
            <h3 className="text-base font-bold  w-16">Writers</h3>
            <ul>
              {writers.map((writer, index) => (
                <li key={index}>{writer}</li>
              ))}
            </ul>
          </div>
        )}
        <hr />
        <div className="mt-6 sm:mt-0 flex gap-4 items-center">
          <h3 className="text-base font-bold mb-2 w-[64px]">Stars</h3>
          <div className="flex gap-2 flex-wrap">
            {cast.length > 0 ? (
              cast.slice(0, 6).map((actor) => (
                <div key={actor.cast_id} className="text-center">
                  <p className="text-sm mt-2">{actor.name}</p>
                </div>
              ))
            ) : (
              <p>No cast available.</p>
            )}
          </div>
        </div>
        <hr />

        {similarMovies.length > 0 && (
          <div className="mt-6 sm:mt-0 flex gap-4 items-center">
            <h3 className="text-base font-bold mb-2 w-[64px]">
              Similar Movies
            </h3>
            <div className="flex gap-4 overflow-x-auto">
              {similarMovies.map((similarMovie) => (
                <div key={similarMovie.id} className="text-center w-36">
                  {similarMovie.poster_path ? (
                    <Image
                      src={`${process.env.TMDB_IMAGE_SERVICE_URL}/w185/${similarMovie.poster_path}`}
                      alt={similarMovie.title}
                      width={120}
                      height={180}
                      className="rounded-md"
                    />
                  ) : (
                    <div className="w-20 h-30 bg-gray-300 rounded-md" />
                  )}
                  <p className="text-sm mt-2">{similarMovie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <hr />
      </div>
    </div>
  );
};

export default page;
