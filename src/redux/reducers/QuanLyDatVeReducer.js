import { SET_CHI_TIET_PHONG_VE } from "../const/settingConst";

const initialState = {
  chiTietPhongVe:{}
}

export const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {

  case SET_CHI_TIET_PHONG_VE:
    state.chiTietPhongVe = action.chiTietPhongVe;
    return { ...state };

  default:
    return state
  }
};
