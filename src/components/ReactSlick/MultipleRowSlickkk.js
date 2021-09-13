import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/const/settingConst";
import Film from "../Films/Film";
import Film_Flip from "../Films/Film_Flip";
import styleSlick from "./MultipleRowSlick.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRows = (props) => {
  const dispatch = useDispatch();

  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const renderFilms = () => {
    console.log("arrFilm", props.arrFilm);

    //lấy khoảng 12phim show ra thui
    // props.arrFilm.slice(0,12).map((item, index)

    return props.arrFilm.map((item, index) => {
      return (
        <div key={index}>
          <Film_Flip item={item}></Film_Flip>
        </div>
      );
    });
  };
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 3,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
  };

  return (
    <div>
      <button
        type="button"
        className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white  mr-2 `}
        onClick={() => {
          dispatch({
            type: SET_FILM_DANG_CHIEU,
          });
        }}
      >
        Now Showing
      </button>
      <button
        type="button"
        //styleSlick[activeClassSC]: css dạng module, chỗ import thì styleSlick dc import ở dạng module
        //nếu styleSlick import ở dạng {styleSlick} thì ta chỉ viết ${activeClassSC}
        className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold border rounded border-gray-800 ml-2 bg-white text-gray-800`}
        onClick={() => {
          dispatch({
            type: SET_FILM_SAP_CHIEU,
          });
        }}
      >
        Coming Soon
      </button>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRows;
