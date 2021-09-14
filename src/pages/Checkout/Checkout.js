import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { CloseOutlined, UserOutlined,SmileOutlined } from "@ant-design/icons";
import { DAT_VE } from "../../redux/const/settingConst";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

export default function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  const dispatch = useDispatch();

  useEffect(() => {
    //gửi mã id của url cho API
    dispatch(layChiTietPhongVeAction(props.match.params.id));
  }, []);

  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      //nếu có ghế vip thì add classGheVip vô
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      // console.log('ghe',ghe)
      //tìm ra giá trị index, sau khi render ra, ta ktra ghe.maGhe có =` với gheDD.maGhe
      //mình chọn vô ghế đó thì maGhe sẽ dc gửi lên redux, ghế đó có trog mảng danhSachGheDangDat. Và sau khi render, nó sẽ ktra ghế sau khi render có trùng với mã ghế ta chọn trc đó hay ko
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      if (indexGheDD !== -1) {
        classGheDangDat = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDangDat}`}
          >
            {ghe.daDat === true ? (
              classGheDaDuocDat !== "" ? (
                <UserOutlined className="mb-1 font-semibold" />
              ) : (
                <CloseOutlined className="mb-1 font-semibold" />
              )
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div className="bg-black w-4/5 "> v</div>
            <div className={`${style["trapezoid"]}`}>
              <div className="mt-3 text-center text-gray-900">Screen</div>
            </div>
            <div>{renderSeats()}</div>
          </div>
          <div className="mt-5 flex justify-center ">
            <table
              className="min-w-full divide-y divide-gray-200 w-2/3"
              style={{ border: "none" }}
            >
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Unseat</th>
                  <th>Seating</th>
                  <th>Seat VIP</th>
                  <th>Seated</th>
                  <th>Self-Seated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td>
                    <button className="ghe text-center"><SmileOutlined /></button>
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center"><SmileOutlined /></button>
                  </td>
                  <td>
                    <button className="ghe gheVip text-center"><SmileOutlined /></button>
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center"><SmileOutlined /></button>
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center"><SmileOutlined /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-2xl text-green-600">
            Booking Information
          </h3>
          <hr />
          <h3 className="text-xl">{thongTinPhim?.tenPhim}</h3>
          <p>Location: {thongTinPhim?.diaChi}</p>
          <p>Release Date: {thongTinPhim?.ngayChieu}</p>
          <hr />
          <div className="flex justify-between align-center">
            {/* render ra loại ghế mình đặt */}
            <div className="font-semibold">
              Seat
              {_.sortBy(danhSachGheDangDat, "stt").map((gheDD, index) => {
                return (
                  <div key={index}>
                    <div className="text-green-500 text-xl"> {gheDD.stt}</div>
                  </div>
                );
              })}
            </div>

            <div className="font-semibold">
              Price
              <div>
                {danhSachGheDangDat?.map((gheDD, index) => {
                  return (
                    <div key={index}>
                      <div className="text-blue-600 text-xl">
                        {" "}
                        {gheDD.giaVe}đ
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-semibold my-auto">Total Price:</div>
            <div className="text-3xl text-red-600">
              {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)}
              đ
            </div>
          </div>

          <hr />
          <div>
            <span className="text-gray-500">E-mail</span>
            <br />
            {userLogin.email}
          </div>
          <hr />
          <div>
            <span className="text-gray-500">Phone</span>
            <br />
            {userLogin.soDT}
          </div>
          <div
            onClick={() => {
              const thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = props.match.params.id;
              thongTinDatVe.danhSachVe = danhSachGheDangDat;
              console.log("thongTinDatVe", thongTinDatVe);
              dispatch(datVeAction(thongTinDatVe));
            }}
            className="mt-10 bg-green-500 text-white w-full text-center p-4 rounded hover:bg-green-600 cursor-pointer"
          >
            Booking Ticket
          </div>
        </div>
      </div>
    </div>
  );
}
