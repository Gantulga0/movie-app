'use client';
import Slider from '@/components/slider/Slider';
import UpComingMovie from '@/components/upcomingMovie/UpComingMovie';
import PopularMovie from '@/components/popularMovie/PopularMovie';
import TopRatedMovie from '@/components/topratedMovie/TopRatedMovie';

export default function Home() {
  return (
    <div>
      <Slider />
      <UpComingMovie />
      <PopularMovie />
      <TopRatedMovie />
    </div>
  );
}
