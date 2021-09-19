import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../const/settingConst";
import {history} from '../../App'
export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhapNguoiDung(thongTinDangNhap);
      console.log("login", result);
      if (result.status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        //login thành công thì chuyển về trang trc đó
        history.push('/');
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};
export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      console.log(result);
      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};

//register
export const dangKyAction = (formDangKy)=>{
  return async (dispatch) => {
    try{
      const result = await quanLyNguoiDungService.dangKyNguoiDung(formDangKy)
      console.log({result});
      history.push('/login');
    }catch(err){console.log('err',err.response?.data)}
  }
}
