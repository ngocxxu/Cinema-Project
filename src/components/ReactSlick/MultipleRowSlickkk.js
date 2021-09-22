import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  SHOW_MODAL
} from "../../redux/const/settingConst";
import Film from "../Films/Film";
import Film_Flip from "../Films/Film_Flip";
import styleSlick from "./MultipleRowSlick.module.css";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

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
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block", right:'0px' }}
      onClick={onClick}
    />
  );
}

const MultipleRows = (props) => {
  const { showModal } = useSelector((state) => state.CarouselReducer);

  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  console.log("thongTinPhim", thongTinPhim);

  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  // let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  // let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const renderFilms = () => {
    // console.log("arrFilm", props.arrFilm);

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
    className: "center p-5 ",
    centerMode: true,
    infinite: true,
    // centerPadding: "45px",
    slidesToShow: 2,
    speed: 500,
    rows: 3,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
    // variableWidth: true
  };

  return (
    <div className="">
      <div className="flex justify-center mb-4">
        <button
          type="button"
          className={` px-8 py-3 font-semibold rounded bg-gray-800 text-white  mr-2 `}
          onClick={() => {
            dispatch({
              type: SET_FILM_DANG_CHIEU
            });
          }}
        >
          Now Showing
        </button>
        <button
          type="button"
          //styleSlick[activeClassSC]: css dạng module, chỗ import thì styleSlick dc import ở dạng module
          //nếu styleSlick import ở dạng {styleSlick} thì ta chỉ viết ${activeClassSC}
          className={` px-8 py-3 font-semibold border rounded border-gray-800 ml-2 bg-white text-gray-800`}
          onClick={() => {
            dispatch({
              type: SET_FILM_SAP_CHIEU
            });
          }}
        >
          Coming Soon
        </button>
      </div>
      <Slider {...settings}>{renderFilms()}</Slider>

      <Modal
        size="lg"
        active={showModal}
        toggler={() =>
          dispatch({
            type: SHOW_MODAL,
            showModal: false
          })
        }
      >
        <ModalHeader
          toggler={() =>
            dispatch({
              type: SHOW_MODAL,
              showModal: false
            })
          }
        >
          Trailer
        </ModalHeader>
        <ModalBody>
          <div className="video max-w-full">
            <iframe
              width="720"
              height="360"
              src={thongTinPhim.trailer}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MultipleRows;
