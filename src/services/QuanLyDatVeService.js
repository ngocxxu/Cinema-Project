import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
  constructor(){
    super()
  }

  layChiTietPhongVe = (maLichChieu)=>{
    //trả về promise
    return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
  }
}

 export const quanLyDatVeService = new QuanLyDatVeService();
