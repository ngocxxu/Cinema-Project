/* eslint-disable import/no-anonymous-default-export */
import { DISPLAY_LOADING, HIDE_LOADING } from "../const/settingConst";

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING:
      state.isLoading = true;
      return { ...state };
    case HIDE_LOADING:
      state.isLoading = false;
      return { ...state };
    default:
      return state;
  }
};
