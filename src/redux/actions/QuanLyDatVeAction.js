import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  CHUYEN_TAB,
  CLEAR_THONG_TIN_DAT_VE,
  DANG_NHAP_ACTION,
  DISPLAY_LOADING,
  HIDE_LOADING,
  SET_CHI_TIET_PHONG_VE,
} from "../const/settingConst";
import { history } from "../../App";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
      // console.log("layChiTietPhongVeAction", result);
      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
        //login thành công thì chuyển về trang trc đó
      }
    } catch (err) {
      console.log("errlayChiTietPhongVeAction", err.response.data);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });

      const result = await quanLyDatVeService.datVe(
        (thongTinDatVe = new ThongTinDatVe())
      );
      console.log("datVeAction", result);

      //đặt vé thành công, gọi api load lại trang phòng vé
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      await dispatch({
        type: CLEAR_THONG_TIN_DAT_VE,
      });

      await dispatch({
        type: HIDE_LOADING,
      });

      dispatch({ type: CHUYEN_TAB });

    } catch (error) {
      console.log("err", error.response.data);
      dispatch({
        type: HIDE_LOADING,
      });
    }
  };
};
