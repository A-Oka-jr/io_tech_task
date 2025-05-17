import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      navigation
      pagination={{ clickable: true, type: 'fraction' }}
      className="h-screen w-full"
    >
      <SwiperSlide>
        <div
          className="h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/slider1.jpg')",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/slider1.jpg')",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/slider1.jpg')",
          }}
        ></div>
      </SwiperSlide>
    </Swiper>
  );
}
