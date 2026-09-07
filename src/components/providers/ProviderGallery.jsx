import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function ProviderGallery({ images = [] }) {
  if (!images.length) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5">
          Work Gallery
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">
            No work images uploaded yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Work Gallery
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[
          Navigation,
          Pagination,
          Autoplay,
        ]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="overflow-hidden rounded-2xl shadow-lg bg-white">

              <img
                src={image}
                alt={`Work ${index + 1}`}
                className="w-full h-72 object-cover hover:scale-110 duration-500"
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}