import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor(){
    super()
  }

  dangNhapNguoiDung = (thongTinDangNhap)=>{
    //trả về promise
    return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
  }
}

 export const quanLyNguoiDungService = new QuanLyNguoiDungService();
