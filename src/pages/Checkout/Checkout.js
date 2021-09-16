/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { CloseOutlined, UserOutlined, SmileOutlined } from "@ant-design/icons";
import {
  CHANGE_TAB_POSITION,
  CHUYEN_TAB,
  DAT_VE,
} from "../../redux/const/settingConst";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";
import { QuanLyNguoiDungReducer } from "../../redux/reducers/QuanLyNguoiDungReducer";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  const dispatch = useDispatch();

  useEffect(() => {
    //gửi mã id của url cho API
    // console.log('props.match.params.id',props.match.params.id)
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
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}`}
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
                    <button className="ghe text-center">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      <SmileOutlined />
                    </button>
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
              // console.log("thongTinDatVe", thongTinDatVe);
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

const { TabPane } = Tabs;

function callback(key) {}

export default function (props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  return (
    <div className="p-5">
      {/* key đóng vai trò là con số để chuyển tab, chứ TabPane ko nhận sự kiện onClick */}
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive.toString()}
        onChange={(key) => {
          dispatch({
            type: CHANGE_TAB_POSITION,
            number: key,
          });
        }}
      >
        <TabPane tab="01 CHOOSE SEAT & PAYMENT" key="1">
          <Checkout {...props}></Checkout>
        </TabPane>
        <TabPane tab="02 BOOKING TICKET RESULT" key="2">
          <KetQuaDatVe {...props}></KetQuaDatVe>
        </TabPane>
      </Tabs>
    </div>
  );
}

function KetQuaDatVe(props) {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { chiTietPhongVe, danhSachGheDangDat } = props;

  const dispatch = useDispatch();

  const renderTicketItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                Showing time: {moment(ticket.ngayDat).format("hh:mm A")} -
                Showing date: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              {/* first lấy ra phần tử mảng đầu tiên */}
              <p>Destination: {seats.tenHeThongRap}</p>
              <p>
                Theater name: {seats.tenCumRap} - Seat:{" "}
                {ticket.danhSachGhe?.map((ghe, index) => {
                  return <span key={index} className="m-1 text-red-600">[{ghe.tenGhe}]
                  {(index + 1) % 4 === 0 ? <br /> : ""}</span>
                  
                  
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);
  return (
    <div className="container mx-auto p-5">
      <h3>Booking Ticket Result</h3>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-600">
              Booking Ticket History
            </h1>
            <p className="lg:w-2/3  mx-auto leading-relaxed text-base">
              You have successfully booked your ticket. Please carefully check
              the information below. We will not refund under any circumstances.
            </p>
          </div>
          <div className="flex flex-wrap m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
