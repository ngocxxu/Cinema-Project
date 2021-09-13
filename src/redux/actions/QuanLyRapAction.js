import {
  quanLyRapService,
  QuanLyRapService,
} from "../../services/QuanLyRapService";
import {
  SET_CHI_TIET_PHIM,
  SET_HE_THONG_RAP_CHIEU,
} from "../const/settingConst";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layDanhSachHeThongRap();

      console.log(result);
      if (result.status === 200) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: result.data.content,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};
export const layThongTinChiTietPhimAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);

      console.log('layThongTinChiTietPhimAction',result);
      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHIM,
          filmDetail: result.data.content,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};
