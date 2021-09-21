import { SET_CAROUSEL, SHOW_MODAL } from "../const/settingConst";

const initialState = {
  arrImg: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
  showModal: false,
};

export const CarouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAROUSEL:
      state.arrImg = action.arrImg;
      return { ...state };

  case SHOW_MODAL:
    state.showModal = action.showModal;
    return { ...state };

    default:
      return state;
  }
};
