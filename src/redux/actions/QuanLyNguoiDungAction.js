import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION } from "../const/settingConst";
import {history} from '../../App'
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
        //login thành công thì chuyển về trang trc đó
        history.goBack();
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};
