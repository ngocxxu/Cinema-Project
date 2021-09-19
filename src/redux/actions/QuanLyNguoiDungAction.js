import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  LAY_THONG_TIN_NGUOI_DUNG_USER,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_LOAI_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG
} from "../const/settingConst";
import { history } from "../../App";
export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhapNguoiDung(
        thongTinDangNhap
      );
      console.log("login", result);
      if (result.status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content
        });
        //login thành công thì chuyển về trang trc đó
        history.push("/");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};
export const layThongTinNguoiDungAction = (taiKhoan = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung(
        taiKhoan
      );
      console.log(result);
      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};

//register
export const dangKyAction = (formDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKyNguoiDung(formDangKy);
      console.log({ result });
      alert('Create is success')
        history.push("/login");
    } catch (err) {
      console.log("err", err.response?.data);
    }
  };
};

//lấy danh sách tài khoản nguoi dùng
export const layDanhSachNguoiDungAction = (keyword = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(keyword);
      console.log("result", result);
      if (result.status === 200) {
        // console.log("result.data.content", result.data.content);
        dispatch({
          type: SET_DANH_SACH_NGUOI_DUNG,
          arrUser: result.data.content
        });
      }
    } catch (err) {
      console.log("err", err);
      console.log("err", err.response?.data);
    }
  };
};

//xóa người dùng
export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      console.log("result", result);
      alert("Delete success!");

      dispatch(layDanhSachNguoiDungAction());
    } catch (err) {
      console.log("err", err);
      console.log("err", err.response?.data);
    }
  };
};

//lấy danh sách loại người dùng
export const layDanhSachLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
      console.log({result});
      if (result.status === 200) {
        dispatch({
          type: SET_LOAI_NGUOI_DUNG,
          arrTypeUser: result.data.content
        });
      }
    } catch (err) {
      console.log("err", err);
      console.log("err", err.response?.data);
    }
  };
};

export const capNhatThongTinNguoiDungAction = (formDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(formDangKy);
      console.log({result});
      alert('Update success!')
      if (result.status === 200) {
        dispatch(layThongTinNguoiDungAction());
        history.push("/admin/users")
      }
    } catch (err) {
      console.log("err", err);
      console.log("err", err.response?.data);
    }
  };
};

export const themNguoiDungAction = (formDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(formDangKy);
      console.log({result});
      if (result.status === 200) {
        dispatch(layThongTinNguoiDungAction());
      }
    } catch (err) {
      console.log("err", err);
      console.log("err", err.response?.data);
    }
  };
};

export const layThongTinNguoiDungUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDungUser(taiKhoan);
      console.log({result});
      if (result.status === 200) {
        dispatch({
          type: LAY_THONG_TIN_NGUOI_DUNG_USER,
          thongTinNguoiDungUser: result.data.content
        });
      }
    } catch (err) {
      console.log("err", err);
      console.log("err", err.response?.data);
    }
  };
};
