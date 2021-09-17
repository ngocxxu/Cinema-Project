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
}

 export const quanLyPhimService = new QuanLyPhimService();
