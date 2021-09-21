import React from "react";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM
} from "../const/settingConst";
import { history } from "../../App";
import { notificationFunction } from "../../template/HomeTemplate/Layout/Notify/Notification";

export const layDanhSachPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content
      });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING
      });

      const result = await quanLyPhimService.themPhimUploadHinh(formData);
      console.log({ result });
      notificationFunction("success", "Add Film is successful");

      history.push("/admin/films");
      await dispatch({
        type: HIDE_LOADING
      });


      
    } catch (err) {
      notificationFunction("error", "Add Film is unsuccessful");
      console.log("err", err);
       dispatch({
        type: HIDE_LOADING
      });

    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {

      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      console.log({ result });
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content
      });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING
      });

      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      notificationFunction("success", "Update is successful");
      console.log("result", result.data.content);

      dispatch(layDanhSachPhimAction());
      history.push("/admin/films");
      await dispatch({
        type: HIDE_LOADING
      });

    } catch (errors) {
      notificationFunction("error", "Update is unsuccessful");
      console.log(errors.response?.data);
       dispatch({
        type: HIDE_LOADING
      });

    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.xoaPhim(maPhim);
      console.log("result", result.data.content);
      notificationFunction("success", "Delete is successful");

      dispatch(layDanhSachPhimAction());
    } catch (errors) {
      notificationFunction("error", "Delete is unsuccessful");
      console.log(errors.response?.data);
    }
  };
};
