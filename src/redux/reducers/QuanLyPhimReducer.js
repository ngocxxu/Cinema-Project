import {
  SET_CHI_TIET_PHIM,
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../const/settingConst";

const initialState = {
  arrFilm: [
    {
      maPhim: 1320,
      tenPhim: "Ad Astra 3",
      biDanh: "ad-astra-3",
      trailer: "https://www.youtube.com/watch?v=P6AaSMfXHbA",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ad-astra_gp07.jpg",
      moTa: "A paranoid thriller in space that follows Roy McBride (Brad Pitt) on a mission across an unforgiving solar system to uncover the truth about his missing father and his doomed expedition that now, 30 years later, threatens the universe.",
      maNhom: "GP07",
      ngayKhoiChieu: "2021-07-24T14:20:30.167",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 1325,
      tenPhim: "Ad Astra 3",
      biDanh: "ad-astra-3",
      trailer: "https://www.youtube.com/watch?v=P6AaSMfXHbA",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ad-astra_gp07.jpg",
      moTa: "A paranoid thriller in space that follows Roy McBride (Brad Pitt) on a mission across an unforgiving solar system to uncover the truth about his missing father and his doomed expedition that now, 30 years later, threatens the universe.",
      maNhom: "GP07",
      ngayKhoiChieu: "2021-07-24T14:20:30.167",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 1328,
      tenPhim: "Ad Astra 3",
      biDanh: "ad-astra-3",
      trailer: "https://www.youtube.com/watch?v=P6AaSMfXHbA",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ad-astra_gp07.jpg",
      moTa: "A paranoid thriller in space that follows Roy McBride (Brad Pitt) on a mission across an unforgiving solar system to uncover the truth about his missing father and his doomed expedition that now, 30 years later, threatens the universe.",
      maNhom: "GP07",
      ngayKhoiChieu: "2021-07-24T14:20:30.167",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 1329,
      tenPhim: "Ad Astra 3",
      biDanh: "ad-astra-3",
      trailer: "https://www.youtube.com/watch?v=P6AaSMfXHbA",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ad-astra_gp07.jpg",
      moTa: "A paranoid thriller in space that follows Roy McBride (Brad Pitt) on a mission across an unforgiving solar system to uncover the truth about his missing father and his doomed expedition that now, 30 years later, threatens the universe.",
      maNhom: "GP07",
      ngayKhoiChieu: "2021-07-24T14:20:30.167",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefaults: [],
  filmDetail: {},
};

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM:
      state.arrFilm = action.arrFilm;
      state.arrFilmDefaults = state.arrFilm;
      return { ...state };

    case SET_FILM_DANG_CHIEU:
      state.dangChieu = !state.dangChieu;
      state.arrFilm = state.arrFilmDefaults.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };

    case SET_FILM_SAP_CHIEU:
      state.sapChieu = !state.sapChieu;
      state.arrFilm = state.arrFilmDefaults.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };

    case SET_CHI_TIET_PHIM:
      state.filmDetail = action.filmDetail;
      return { ...state };
    default:
      return state;
  }
};
