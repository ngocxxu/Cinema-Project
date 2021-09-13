import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
  constructor(){
    super()
  }

  layDanhSachHeThongRap = ()=>{
    //trả về promise
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
  }
  layThongTinLichChieuPhim=(maPhim)=>{
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  }
  
}

 export const quanLyRapService = new QuanLyRapService();
