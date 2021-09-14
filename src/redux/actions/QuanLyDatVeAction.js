import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION, SET_CHI_TIET_PHONG_VE } from "../const/settingConst";
import {history} from '../../App'
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
      const result = await quanLyDatVeService.datVe(thongTinDatVe = new ThongTinDatVe());
      console.log("datVeAction", result);
      if (result.status === 200) {
        // dispatch({
        //   type: SET_CHI_TIET_PHONG_VE,
        //   chiTietPhongVe: result.data.content,
        // });
        //login thành công thì chuyển về trang trc đó
        
      }
    } catch (error) {
      console.log("err", error.response.data);
    }
  };
};
