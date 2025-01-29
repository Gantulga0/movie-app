import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const API_TOKEN = process.env.API_TOKEN;

  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      console.log(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovieData;
  }, []);
  return <div></div>;
}
