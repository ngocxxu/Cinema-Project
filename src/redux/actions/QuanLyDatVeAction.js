import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  CHUYEN_TAB,
  CLEAR_THONG_TIN_DAT_VE,
  DANG_NHAP_ACTION,
  DAT_VE,
  DISPLAY_LOADING,
  HIDE_LOADING,
  SET_CHI_TIET_PHONG_VE,
} from "../const/settingConst";
import { history } from "../../App";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { connection } from "../../index";
import { notificationFunction } from "../../template/HomeTemplate/Layout/Notify/Notification";

export const layChiTietPhongVeAction = (maLichChieu) => {
  // console.log("maLichChieuAction",maLichChieu)
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

export const datVeAction = (thongTinDatVe) => {
  console.log('thongTinDatVeAction',thongTinDatVe)
  return async (dispatch,getState) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });

      const result = await quanLyDatVeService.datVe(
        (thongTinDatVe)
      );
      console.log("datVeAction", result);
      notificationFunction("success", "Booking Ticket is successful");
      //đặt vé thành công, gọi api load lại trang phòng vé
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      await dispatch({
        type: CLEAR_THONG_TIN_DAT_VE,
      });

      await dispatch({
        type: HIDE_LOADING,
      });

      let {taiKhoan} = getState().QuanLyNguoiDungReducer.userLogin
      //sau khi mình đặt ghế thành công, thì trang sẽ dc load lại cho các user khác biết là mình đặt r
      await connection.invoke('datGheThanhCong',taiKhoan,thongTinDatVe.maLichChieu)

      dispatch({ type: CHUYEN_TAB });


    } catch (error) {
      notificationFunction("error", "Booking Ticket is unsuccessful");
      console.log("err", error.response.data);
      dispatch({
        type: HIDE_LOADING,
      });
    }
  };
};


export const datGheAction = (ghe,maLichChieu) => {
  //getState giúp ta lấy dữ liệu từ các reducer khác giống useSelector
  //do action ko có sự kiện useSelector nên ta dùng getState của thunk
  return async (dispatch,getState) => {
    //đưa thông tin ghế lên reducer
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    })
    //call api từ backend
    let {danhSachGheDangDat} = getState().QuanLyDatVeReducer
    let {taiKhoan} = getState().QuanLyNguoiDungReducer.userLogin

    //chuyển mảng thành chuỗi
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)

    //call api của signalR, gửi lên server BE, r sau đó BE ầm thầm trả về kết quả ngầm cho các user khác thông qua connection.on() bên mục checkout
    connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu)
  }
}