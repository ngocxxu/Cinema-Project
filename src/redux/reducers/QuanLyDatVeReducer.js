import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { CHANGE_TAB_POSITION, CHUYEN_TAB, CLEAR_THONG_TIN_DAT_VE, DAT_VE, SET_CHI_TIET_PHONG_VE } from "../const/settingConst";

const initialState = {
  chiTietPhongVe:new ThongTinLichChieu(),
  danhSachGheDangDat:[],
  tabActive: 1,
  danhSachGheKhachDat:[
    {maGhe:60552},
    {maGhe:60553},
  ]
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

    case CLEAR_THONG_TIN_DAT_VE:
    state.danhSachGheDangDat = [];
    return { ...state}

    case CHUYEN_TAB:
    state.tabActive = 2;
    return{...state}

    case CHANGE_TAB_POSITION:
    state.tabActive = action.number;
    return{...state}

  default:
    return state
  }
};
