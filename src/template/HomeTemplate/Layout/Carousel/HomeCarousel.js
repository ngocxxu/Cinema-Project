/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
import './HomeCarousel.css'
const contentStyle = {
  height: "900px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();

  //gọi api
  useEffect(() => {
    //dispatch màu cam của redux-thunk, dc trả về sau khi function nó thực thi xong
    //1 action = {type, data}
    //2 (cài middlewware): callbackfunction(dispatch)
    dispatch(getCarouselAction());
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div 
            className="h-full w-full"
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
          </div>
        </div>
      );
    });
  };

  return <Carousel autoplay effect="fade">{renderImg()}</Carousel>;
}
