import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  DISPLAY_LOADING,
  HIDE_LOADING,
  LAY_THONG_TIN_NGUOI_DUNG_USER,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_LOAI_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG
} from "../const/settingConst";
import { history } from "../../App";
import { notificationFunction } from "../../template/HomeTemplate/Layout/Notify/Notification";
export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING
      });
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
      await dispatch({
        type: HIDE_LOADING
      });
    } catch (err) {
      console.log("err", err);
      dispatch({
        type: HIDE_LOADING
      });
    }
  };
};
export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    // console.log('hello')
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
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
      notificationFunction("success", "Register is successful");
      history.push("/login");
    } catch (err) {
      notificationFunction("error", "Register is unsuccessful");
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
      notificationFunction("success", "Delete is successful");

      dispatch(layDanhSachNguoiDungAction());
    } catch (err) {
      notificationFunction("error", "Delete is unsuccessful");
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
      console.log({ result });
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
      dispatch({
        type: DISPLAY_LOADING
      });

      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        formDangKy
      );
      console.log({ result });
      notificationFunction("success", "Update is successful");
      if (result.status === 200) {
        dispatch(layThongTinNguoiDungAction());
        if (formDangKy.maLoaiNguoiDung === "QuanTri") {
          history.push("/admin/users");
        } else {
          // window.location.reload()
        }
      }
      await dispatch({
        type: HIDE_LOADING
      });

    } catch (err) {
      notificationFunction("error", "Update is unsuccessful");
      console.log("err", err);
      console.log("err", err.response?.data);
       dispatch({
        type: HIDE_LOADING
      });

    }
  };
};

export const themNguoiDungAction = (formDangKy) => {
  return async (dispatch) => {
    try {
       dispatch({
        type: DISPLAY_LOADING
      });

      const result = await quanLyNguoiDungService.themNguoiDung(formDangKy);
      console.log({ result });
      notificationFunction("success", "Add User is successful");
      if (result.status === 200) {
        dispatch(layThongTinNguoiDungAction());
      }
      await dispatch({
        type: HIDE_LOADING
      });

    } catch (err) {
      notificationFunction("error", "Add User is unsuccessful");
      console.log("err", err);
      console.log("err", err.response?.data);
       dispatch({
        type: HIDE_LOADING
      });

    }
    
  };
};

export const layThongTinNguoiDungUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDungUser(
        taiKhoan
      );
      console.log({ result });
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
