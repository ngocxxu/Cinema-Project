import React, { useEffect, useState } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
//Kết nối redux
import { useSelector, useDispatch } from "react-redux";
import Film from "../../components/Films/Film";
import MultipleRowSlickkk from "../../components/ReactSlick/MultipleRowSlickkk";
import MultipleRowSlick from "../../components/ReactSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../template/HomeTemplate/Layout/Carousel/HomeCarousel";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();

  // props.match.params
  // const renderFilms = () => {
  //     return arrFilm.map((phim, index) => {
  //         return <Film key={index} />
  //     })
  // }

  useEffect(() => {
    //dispatch function từ thunk
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);

  return (
    <div>
      <HomeCarousel></HomeCarousel>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <MultipleRowSlickkk arrFilm={arrFilm}></MultipleRowSlickkk>
        </div>
      </section>
      <div className="mx-36 mb-40 p-4  bg-green-600 rounded shadow-2xl">
        <HomeMenu  heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
