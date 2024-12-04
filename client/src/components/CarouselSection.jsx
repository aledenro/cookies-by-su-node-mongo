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
    "https://r2.fivemanage.com/pub/uv1nlgt9dt2y.jpg",
    "https://r2.fivemanage.com/pub/2q9p13rhnlbe.jpg",
    "https://r2.fivemanage.com/pub/rsvo9g03zgyw.jpg",
    "https://r2.fivemanage.com/pub/jjdwbnhb2ozl.jpg",
    "https://r2.fivemanage.com/pub/td40fs1xdh8m.jpg",
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
