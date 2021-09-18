import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService {
  constructor(){
    super()
  }

  layDanhSachBanner = ()=>{
    //trả về promise
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`)
  }
  layDanhSachPhim = ()=>{
    //trả về promise
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
  }
  themPhimUploadHinh=(formData)=>{
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`,formData)
  }
  layThongTinPhim=(maPhim)=>{
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
  }
  capNhatPhimUpload = (formData) => {
    return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`,formData);
}}

 export const quanLyPhimService = new QuanLyPhimService();
