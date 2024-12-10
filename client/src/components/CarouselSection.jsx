import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const images = [
    "https://r2.fivemanage.com/kbqI3AHdhK2QGt3ZcWIHM/351118112_6264946373592569_1826043116730662657_n.jpg",
    "https://r2.fivemanage.com/kbqI3AHdhK2QGt3ZcWIHM/348575197_265578719309951_3034391994158666451_n.jpg",
    "https://r2.fivemanage.com/kbqI3AHdhK2QGt3ZcWIHM/346834790_1387075515471996_6448523168550510551_n.jpg",
    "https://r2.fivemanage.com/kbqI3AHdhK2QGt3ZcWIHM/363296740_182143578192414_3356794052320316428_n.jpg",
    "https://r2.fivemanage.com/kbqI3AHdhK2QGt3ZcWIHM/456561606_17929745045922197_2519593361279389574_n.jpg",
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="font-lilita text-3xl font-bold text-center text-black mb-8">
          Nuestros Productos
        </h2>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="px-4">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt={`Producto ${index + 1}`}
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselSection;
