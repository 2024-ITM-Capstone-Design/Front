import Slider from "react-slick"; // 슬라이더 라이브러리 추가
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tw from "twin.macro";
import styled from "styled-components";
import img1 from "../../assets/Dummy/dummyImg.png";
import img2 from "../../assets/Dummy/image2.png";
import img3 from "../../assets/Dummy/image3.png";
import img4 from "../../assets/Dummy/image4.png";
import img5 from "../../assets/Dummy/image5.png";
import img6 from "../../assets/Dummy/image6.png";
import { useEffect, useRef, useState } from "react";

function ImgSlider({
  type,
  images,
  currentTime,
}: {
  type: string;
  images: string[];
  currentTime: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef<Slider | null>();

  useEffect(() => {
    if (type === "MANY") {
      // 36초마다 이미지 변경
      const newIndex = Math.floor(currentTime / 36);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    } else if (type === "BOTH") {
      // currentTime이 0이면 첫 번째 이미지만 보여줌
      if (currentTime === 0) {
        setActiveIndex(0);
      } else {
        // currentTime이 0 이상이면 두 번째 이미지부터 36초마다 변경
        const newIndex = Math.floor(currentTime / 36) + 1;
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    }
  }, [currentTime, type, activeIndex]);

  useEffect(() => {
    goToNextIndex();
  }, [activeIndex]); // activeIndex가 변경될 때 슬라이더 업데이트

  const settings = {
    dots: true,
    infinite: false,
    touchRatio: 0, //드래그 금지
    speed: 500,
    slidesToShow: 1,
    slidesPerRow: 1,
    arrows: false,
    draggable: false,
    // autoplay: true,

    appendDots: (dots: any) => (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "7px",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };
  const goToNextIndex = () => {
    if (slideRef.current) {
      slideRef.current.slickGoTo(activeIndex);
    }
  };

  return (
    <SliderBox>
      <Slider ref={(slider) => (slideRef.current = slider)} {...settings}>
        {images.map((data, index) => (
          <div key={index} className="text-center m-auto">
            <ImgContainer src={data} />
          </div>
        ))}
      </Slider>
    </SliderBox>
  );
}

export default ImgSlider;

const SliderBox = styled.div`
  ${tw`w-[290px]`}
`;
const ImgContainer = styled.img`
  ${tw`w-[290px] h-[290px] rounded-[20px]`}
`;
