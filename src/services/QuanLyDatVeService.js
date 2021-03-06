import { GROUPID, TOKEN, TOKEN_CYBER } from "../util/setting/config";
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";
import Axios from "axios";

export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }

  // layChiTietPhongVe = (maLichChieu)=>{
  //   //trả về promise
  //   return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
  // }
  // datVe = (thongTinDatVe = new ThongTinDatVe())=>{
  //   return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe)
  // }
  layChiTietPhongVe = (maLichChieu) => {
    console.log("maLichChieuSevice",maLichChieu)
    return Axios({
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      method: "GET",
      data: maLichChieu,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN), 'TokenCybersoft': TOKEN_CYBER }, //JWT
    });
  };

  datVe = (thongTinDatVe) => {
    return Axios({
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe`,
      method: "POST",
      data: (thongTinDatVe),

      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) , 'TokenCybersoft': TOKEN_CYBER}, //JWT
    });
  };

  taoLichChieu = (thongTinLichChieu) => {
    return this.post(`/api/QuanLyDatVe/TaoLichChieu`,thongTinLichChieu)
  }
}

export const quanLyDatVeService = new QuanLyDatVeService();
