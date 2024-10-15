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

function ImgSlider() {
  const DummyImgs = [img1, img2, img3, img4, img5, img6];

  const settings = {
    dots: true,
    infinite: false,
    touchRatio: 0, //드래그 금지
    speed: 500,
    slidesToShow: 1,
    slidesPerRow: 1,
    arrows: false,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 36000,

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
    afterChange: (index: number) => {
      if (index === DummyImgs.length - 1) {
        settings.autoplay = false;
      }
    },
  };

  return (
    <SliderBox>
      <Slider {...settings}>
        {DummyImgs.map((data, index) => (
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
