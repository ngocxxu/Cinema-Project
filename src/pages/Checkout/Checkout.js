/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  datGheAction,
  datVeAction,
  layChiTietPhongVeAction
} from "../../redux/actions/QuanLyDatVeAction";
import style from "./Checkout.module.css";
import "./Checkout.css";
import {
  CloseOutlined,
  UserOutlined,
  SmileOutlined,
  WarningOutlined,
  HomeOutlined
} from "@ant-design/icons";
import {
  CHANGE_TAB_POSITION,
  CHUYEN_TAB,
  DAT_GHE,
  DAT_VE
} from "../../redux/const/settingConst";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Button, Tabs } from "antd";
import { QuanLyNguoiDungReducer } from "../../redux/reducers/QuanLyNguoiDungReducer";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import { connection } from "../..";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import { NavLink } from "react-router-dom";

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  const dispatch = useDispatch();

  useEffect(() => {
    //gửi mã id của url cho API
    // console.log('props.match.params.id',props.match.params.id)
    dispatch(layChiTietPhongVeAction(props.match.params.id));

    //các user khác sẽ lắng nghe
    //nếu có user nào thực hiện việc đặt vé thành công, ta sẽ load lại DS phòng vé
    connection.on("datVeThanhCong", () => {
      //load lại danh sách vé
      dispatch(layChiTietPhongVeAction(props.match.params.id));
    });

    //vừa load trang là gọi lên api backend load dữ liệu khách đặt ghế
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    //load danh sách ghế đang đặt từ api về
    //này giống mapstatetopros, lấy data từ api về
    //"loadDanhSachGheDaDat" này kết nối tới Backend, giống saga, gửi action để saga lắng nge thực hiện
    //nó đc kích hoạt tự động để báo cáo rằng đang có 1 user khác đang đặt vé
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // console.log("danhSachGheKhachDat", dsGheKhachDat);
      //bước 1: loại user của mình ra khỏi danh sách
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );

      //bước 2: gộp DS ghế khách đặt đã lọc ở trên và ở all các user thành 1 mảng chung
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        //vì danhSachGhe đang là string nên cần chuyển về mảng
        let arrGhe = JSON.parse(item.danhSachGhe);

        //push từng cái ghế vào mảng arrGheKhachDat
        return [...result, ...arrGhe];
      }, []);

      //loại ra những giá trị trùng nhau
      //đưa dữ liệu lên redux cập nhật
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");
      dispatch({ type: DAT_GHE, arrGheKhachDat });
    });

    //cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);
    //bấm qua trag khác vẫn clear ghế
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  //clear ghế khi ng khác F5 trang
  //gửi yêu cầu lên api backend để hủy ghế
  const clearGhe = function (e) {
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  };

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

      //ktra từng ghế và render xem có phải ghế khách đặt hay ko
      //tìm thấy dc ghế của khách trong mảng ghế đang render
      let classGheKhachDat = "";
      let indexGheKhachDat = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKhachDat !== -1) {
        classGheKhachDat = "gheKhachDat";
      }

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
              dispatch(datGheAction(ghe, props.match.params.id));
            }}
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}
          >
            {ghe.daDat === true ? (
              classGheDaDuocDat !== "" ? (
                <UserOutlined className="mb-1 font-semibold" />
              ) : (
                <CloseOutlined className="mb-1 font-semibold" />
              )
            ) : classGheKhachDat === "" ? (
              ghe.stt
            ) : (
              <WarningOutlined className="mb-1 font-semibold" />
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
            <div className="mt-20">{renderSeats()}</div>
          </div>
          <div className="mt-5 flex justify-center ">
            <table
              className="min-w-full divide-y divide-gray-200 w-2/3"
              style={{ border: "none" }}
            >
              <thead className="bg-gray-50 p-5">
                <tr className='text-left pl-6'>
                  <th>Unseat</th>
                  <th>Seating</th>
                  <th>Seat VIP</th>
                  <th>Seated</th>
                  <th>Self-Seated</th>
                  <th>Someone Seating</th>
                </tr>
              </thead>
              <tbody className=" bg-white">
                <tr>
                  <td className=''>
                    <button className=" ghe text-center ">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td className=''>
                    <button className="ghe gheDangDat text-center ">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td className=''>
                    <button className="ghe gheVip text-center ">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td className=''>
                    <button className="ghe gheDaDat text-center ">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td className=''>
                    <button className="ghe gheDaDuocDat text-center ">
                      <SmileOutlined />
                    </button>
                  </td>
                  <td className=''>
                    <button className="ghe gheKhachDat text-center ">
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

export default function CheckoutTab(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <button
            className=""
            onClick={() => {
              history.push("/profile");
            }}
          >
            {" "}
            <div className="w-16 h-16 rounded-full bg-yellow-500 flex justify-center items-center capitalize text-white text-2xl mr-4">
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
            {/* <div className='text-xl'>Hello, {userLogin.taiKhoan}</div> */}
          </button>
          <button
            className="text-red-400"
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/home");
              //refresh trang lại
              window.location.reload();
            }}
          >
            Sign out
          </button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  //reset tabpane lại thì khi chuyển trang từ Home
  useEffect(() => {
    return () => {
      dispatch({
        type: CHANGE_TAB_POSITION,
        number: "1"
      });
    };
  }, []);

  return (
    <div className="p-5">
      {/* key đóng vai trò là con số để chuyển tab, chứ TabPane ko nhận sự kiện onClick */}
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive.toString()}
        onChange={(key) => {
          dispatch({
            type: CHANGE_TAB_POSITION,
            number: key
          });
        }}
      >
        <TabPane tab="01 CHOOSE SEAT & PAYMENT" key="1">
          <Checkout {...props}></Checkout>
        </TabPane>
        <TabPane tab="02 BOOKING TICKET RESULT" key="2">
          <KetQuaDatVe {...props}></KetQuaDatVe>
        </TabPane>
        <TabPane
          tab={
            <NavLink className=" text-4xl" to="/">
              <HomeOutlined className=' mb-6' />
            </NavLink>
          }
          key="0"
        ></TabPane>
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
                  return (
                    <span key={index} className="m-1 text-red-600">
                      [{ghe.tenGhe}]{(index + 1) % 4 === 0 ? <br /> : ""}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    // console.log
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
