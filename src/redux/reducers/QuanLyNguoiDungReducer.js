import { USER_LOGIN } from "../../util/setting/config";
import { TOKEN } from "../../util/setting/config";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../const/settingConst";

let user = {};
//trường hợp này áp dụng khi tắt máy hay tắt browser nhưng thông tin vẫn dc lưu lại
if (localStorage.getItem(USER_LOGIN)) {
  //nếu có USER_LOGIN thì nó sẽ từ string parse ra obj lại roi gán lại cho user
  //lấy user gán lại cho userLogin
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user,
  thongTinNguoiDung: {},
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION:
      //chuyển obj -> string thông qa JSONstringtify
      //và nó sẽ lưu trog localstorage ở dạng string vì localStorage ko lưu dc ở dạng obj,arr
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
      //lưu Token từ ng dùng login mà ko cần phải mất thoi gian mà
      //lấy token ra và lưu ở localStorage
      localStorage.setItem(TOKEN, action.thongTinDangNhap.accessToken);
      return { ...state, userLogin: action.thongTinDangNhap };

    case SET_THONG_TIN_NGUOI_DUNG:
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };

    default:
      return { ...state };
  }
};
