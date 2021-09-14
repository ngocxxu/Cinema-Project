import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { DAT_VE, SET_CHI_TIET_PHONG_VE } from "../const/settingConst";

const initialState = {
  chiTietPhongVe:new ThongTinLichChieu(),
  danhSachGheDangDat:[],
}

export const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {

  case SET_CHI_TIET_PHONG_VE:
    state.chiTietPhongVe = action.chiTietPhongVe;
    return { ...state };
  case DAT_VE:
    //update danh sách ghế đang đặt
    let danhSachGheCapNhat = [...state.danhSachGheDangDat];
    let index = danhSachGheCapNhat.findIndex(item => item.maGhe === action.gheDuocChon.maGhe)
    //nếu tìm thấy index
    //điều này khiến cho mảng danhSachGheDangDat sẽ ko có số ghế trùng nhau
    if(index !== -1) {
      // state.danhSachGheDangDat = danhSachGheCapNhat.filter(item => item.maGhe !== action.gheDuocChon.maGhe)
    danhSachGheCapNhat.splice(index, 1);
    }else{
      danhSachGheCapNhat.push(action.gheDuocChon);
    }
    return { ...state, danhSachGheDangDat:danhSachGheCapNhat };

  default:
    return state
  }
};
