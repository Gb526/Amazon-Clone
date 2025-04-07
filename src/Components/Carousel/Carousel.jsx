import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imageList } from "./data";
import Classes from "../../Components/Carousel/Carousel"

function CarouselImage() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {imageList.map((image, i) => {
          return <img key={i} src={image}/>;
        })}
      </Carousel>
      {<div className={Classes.carousel__effect}></div> }
    </div>
  );
}

export default CarouselImage;
