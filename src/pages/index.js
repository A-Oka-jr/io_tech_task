import HeroCarousel from '../components/layout/HeroCarousel';

export default function Home() {
  return (
    <div className="h-screen w-full relative">
      <HeroCarousel />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Welcome to My Site!</h1>
      </div>
    </div>
  );
}
