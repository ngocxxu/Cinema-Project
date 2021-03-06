import { USER_LOGIN } from "../../util/setting/config";
import { TOKEN } from "../../util/setting/config";
import {
  DANG_NHAP_ACTION,
  LAY_THONG_TIN_NGUOI_DUNG_USER,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_LOAI_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG,
  TOGGLE_EDIT
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
  thongTinNguoiDungDefault: {},
  arrUser: [
    {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung: "",
    },
  ],
  arrUserDefault: [],
  arrTypeUser: [],
  thongTinNguoiDungUser: {},
  editUser: false,
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
      state.thongTinNguoiDungDefault = state.thongTinNguoiDung;
      return { ...state };

    case SET_DANH_SACH_NGUOI_DUNG:
      state.arrUser = action.arrUser;
      console.log('state.arrUser',state.arrUser)
      state.arrUserDefault = state.arrUser;
      return { ...state };

    case SET_LOAI_NGUOI_DUNG:
      console.log('action.arrTypeUser',action.arrTypeUser)
      state.arrTypeUser = action.arrTypeUser;
      return { ...state };

    case LAY_THONG_TIN_NGUOI_DUNG_USER:
    state.thongTinNguoiDungUser = action.thongTinNguoiDungUser;
    return { ...state };

    case TOGGLE_EDIT:
    state.editUser = action.editUser;
    return { ...state };

    default:
      return { ...state };
  }
};
