import React from "react";
import Slider from "react-slick";
import img2 from "../../assets/images/banner-4.jpeg";
import img3 from "../../assets/images/slider-2.jpeg";
import img4 from "../../assets/images/slider-image-1.jpeg";
import img5 from "../../assets/images/slider-image-3.jpeg";
import img1 from "../../assets/images/slider-image-2.jpeg";


export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex cursor-pointer pt-5">
    <Slider {...settings} className="slider w-3/4 mx-auto flex justify-center items-center">
      <div>
        <img src={img1} alt="" className="w-full h-72" />
      </div>
      <div>
        <img src={img2} alt="" className="w-full h-72" />
      </div>
      <div>
        <img src={img3} alt="" className="w-full h-72" />
      </div>
      <div>
        <img src={img4} alt="" className="w-full h-72" />
      </div>
      <div>
        <img src={img5} alt="" className="w-full h-72" />
      </div>
    </Slider>
    
    
        <div className="w-1/4">
        <img src={img2} alt="" className="w-full h-36" />
        <img src={img3} alt="" className="w-full h-36" />
    </div>
    </div>
    
  );
}
