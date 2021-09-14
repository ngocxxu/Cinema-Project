import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { layChiTietPhongVeAction } from "../../redux/actions/QuanLyDatVeAction";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { CloseOutlined } from "@ant-design/icons";
import { DAT_VE } from "../../redux/const/settingConst";
import _ from "lodash";

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
      //tìm ra giá trị index, sau khi render ra, ta ktra ghe.maGhe có =` với gheDD.maGhe
      //mình chọn vô ghế đó thì maGhe sẽ dc gửi lên redux, ghế đó có trog mảng danhSachGheDangDat. Và sau khi render, nó sẽ ktra ghế sau khi render có trùng với mã ghế ta chọn trc đó hay ko
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
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
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat}`}
          >
            {ghe.daDat === true ? (
              <CloseOutlined className="mb-1 font-semibold" />
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
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-2xl text-green-600">Booking Information</h3>
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
          <div className="mt-10 bg-green-500 text-white w-full text-center p-4 rounded hover:bg-green-600 cursor-pointer">
            Booking Ticket
          </div>
        </div>
      </div>
    </div>
  );
}
