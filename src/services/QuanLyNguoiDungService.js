import Axios from "axios";
import { GROUPID, TOKEN } from "../util/setting/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor(){
    super()
  }

  dangNhapNguoiDung = (thongTinDangNhap)=>{
    //trả về promise
    return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
  }
  layThongTinNguoiDung = ()=>{
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
  }

//   layThongTinNguoiDung= () => {
//     return Axios({
//         url:`http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
//         method:'POST',
//         headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT
//     }) 
// }




}

 export const quanLyNguoiDungService = new QuanLyNguoiDungService();
