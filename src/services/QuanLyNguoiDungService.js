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
  dangKyNguoiDung = (formDangKy)=>{
    return this.post(`/api/QuanLyNguoiDung/DangKy`,formDangKy)
  }
  layDanhSachNguoiDung = (keyword='')=>{
    if(keyword.trim() !== ''){
      return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${keyword}`)
    }
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
  }
  xoaNguoiDung = (taiKhoan)=>{
    return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
  }
  layDanhSachLoaiNguoiDung = ()=>{
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
  }
  capNhatThongTinNguoiDung = (formDangKy)=>{
    return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,formDangKy)
  }

  themNguoiDung = (formDangKy)=>{
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`,formDangKy)
  }

  layThongTinNguoiDungUser = (taiKhoan)=>{
    return this.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
  }


}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
