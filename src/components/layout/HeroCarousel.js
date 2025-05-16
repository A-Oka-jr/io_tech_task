import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay } from 'swiper/modules';

export default function HeroCarousel() {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect="fade"
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      className="h-screen w-full"
    >
      <SwiperSlide>
        <div
          className="h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/random/1600x900')",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
          }}
        ></div>
      </SwiperSlide>
    </Swiper>
  );
}
