import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION } from "../const/settingConst";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhapNguoiDung(thongTinDangNhap);
      console.log("login", result);
      if (result.status === 200) {
        // console.log("hello")
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};
