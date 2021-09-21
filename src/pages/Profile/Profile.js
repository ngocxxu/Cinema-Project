import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatThongTinNguoiDungAction,
  layThongTinNguoiDungAction
} from "../../redux/actions/QuanLyNguoiDungAction";
import _ from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GROUPID, USER_LOGIN } from "../../util/setting/config";
import { TOGGLE_EDIT } from "../../redux/const/settingConst";
import { Redirect } from "react-router";

export default function Profile(props) {
  // const [stateEdit, setStateEdit] = useState(false);
  const { thongTinNguoiDungDefault } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { editUser } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { thongTinDatVe } = thongTinNguoiDungDefault;
  // const {danhSachGhe} = thongTinDatVe
  console.log({ thongTinNguoiDungDefault });
  const dispatch = useDispatch();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDungDefault?.taiKhoan,
      hoTen: thongTinNguoiDungDefault?.hoTen,
      email: thongTinNguoiDungDefault?.email,
      // soDt: thongTinNguoiDungDefault?.soDt,
      soDt: thongTinNguoiDungDefault?.soDT,
      matKhau: thongTinNguoiDungDefault?.matKhau,
      maLoaiNguoiDung: "KhachHang",
      loaiNguoiDung: thongTinNguoiDungDefault?.loaiNguoiDung,
      maNhom: GROUPID
    },
    validationSchema: Yup.object().shape({
      hoTen: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Name can not a number")
        .required("Name can not be empty!"),
      taiKhoan: Yup.string()
        .min(6, "Account name must be at least 6 characters")
        .max(20, "Account name must be at maximum 32 characters")
        .required("Account name can not be empty!"),
      matKhau: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be at maximum 32 characters")
        .required("Password can not be empty!"),
      email: Yup.string()
        .email("Email is invalid!")
        .required("Email can not be empty!"),
      soDt: Yup.string()
        .min(6, "Phone number must be at least 6 characters")
        .matches(/^[0-9]+$/, "Phone number can not a character")
        .required("Phone number can not be empty!")
    }),

    onSubmit: (values) => {
      console.log({ values });
      dispatch(capNhatThongTinNguoiDungAction(values));
      dispatch({
        type: TOGGLE_EDIT,
        editUser: false
      });
    }
  });

  const renderCardTicket = () => {
    return thongTinNguoiDungDefault.thongTinDatVe?.map((ticket, index) => {
      const seat = _.first(ticket.danhSachGhe);
      return (
        <div className="flex flex-row mt-2">
          <div
            className="flex w-full items-center justify-between bg-white
  dark:bg-gray-800 px-8 py-6 border-l-4 border-green-500
  dark:border-green-300"
          >
            {/* card */}
            <div className="flex">
              <img
                className="h-30 w-20 rounded object-cover"
                src={ticket.hinhAnh}
                alt="infamous"
              />
              <div className="flex flex-col ml-6">
                <span className="text-lg font-bold">{ticket.tenPhim}</span>
                <div className="mt-4 flex">
                  <div className="flex ml-6">
                    <svg
                      className="h-5 w-5 fill-current
            dark:text-gray-300"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19
              19H5V8h14m-3-7v2H8V1H6v2H5c-1.11
              0-2 .89-2 2v14a2 2 0 002 2h14a2 2
              0 002-2V5a2 2 0 00-2-2h-1V1m-1
              11h-5v5h5v-5z"
                      />
                    </svg>
                    <span
                      className="ml-2 text-sm text-gray-600
            dark:text-gray-300 capitalize"
                    >
                      {moment(ticket.ngayDat).format("DD/MM/YYYY")} -{" "}
                      {moment(ticket.ngayDat).format("hh:mm A")}
                    </span>
                  </div>
                  <div className="flex ml-6">
                    <svg
                      className="h-5 w-5 fill-current
            dark:text-gray-300"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13 2.05v2.02c3.95.49 7 3.85 7
              7.93 0 3.21-1.92 6-4.72 7.28L13
              17v5h5l-1.22-1.22C19.91 19.07 22
              15.76 22
              12c0-5.18-3.95-9.45-9-9.95M11
              2c-1.95.2-3.8.96-5.32 2.21L7.1
              5.63A8.195 8.195 0 0111 4V2M4.2
              5.68C2.96 7.2 2.2 9.05 2
              11h2c.19-1.42.75-2.77
              1.63-3.9L4.2 5.68M6
              8v2h3v1H8c-1.1 0-2 .9-2
              2v3h5v-2H8v-1h1c1.11 0 2-.89
              2-2v-1a2 2 0 00-2-2H6m6
              0v5h3v3h2v-3h1v-2h-1V8h-2v3h-1V8h-2M2
              13c.2 1.95.97 3.8 2.22
              5.32l1.42-1.42A8.21 8.21 0 014
              13H2m5.11 5.37l-1.43 1.42A10.04
              10.04 0 0011 22v-2a8.063 8.063 0
              01-3.89-1.63z"
                      />
                    </svg>
                    <span
                      className="ml-2 text-sm text-gray-600
            dark:text-gray-300 capitalize"
                    >
                      {ticket.thoiLuongPhim} mins
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex">
                  <div className="flex ml-6">
                    <span
                      className=" text-sm text-gray-600
            dark:text-gray-300 capitalize"
                    >
                      Cinema:
                    </span>
                    <span
                      className="ml-2 text-sm text-green-600
            dark:text-gray-300 capitalize"
                    >
                      {seat.tenHeThongRap}
                    </span>
                  </div>
                  <div className="flex ml-6">
                    <span
                      className="ml-2 text-sm text-gray-600
            dark:text-gray-300 capitalize"
                    >
                      Theater:
                    </span>
                    <span
                      className="ml-2 text-sm text-blue-600
            dark:text-gray-300 capitalize"
                    >
                      {seat.tenRap}
                    </span>
                  </div>
                  <div className="flex ml-6">
                    <span
                      className="ml-2 text-sm text-gray-600
            dark:text-gray-300 capitalize"
                    >
                      Seats:
                    </span>
                    {ticket.danhSachGhe?.map((ghe, index) => {
                      return (
                        <span
                          key={index}
                          className="ml-2 text-sm text-red-600
                    dark:text-gray-300 capitalize"
                        >
                          [{ghe.tenGhe}]{(index + 1) % 4 === 0 ? <br /> : ""}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col -mt-10 mr-20">
              <span
                className="font-semibold text-green-500
      dark:text-green-300"
              >
                Total price
              </span>
              <span
                className="text-lg text-gray-700 dark:text-gray-400
      mt-2"
              >
                {ticket.giaVe * ticket.danhSachGhe.length} đ
              </span>
            </div>
          </div>
          <div
            className="text-center flex flex-col items-center
  justify-center bg-white dark:bg-gray-800
  dark:text-gray-300 ml-1 px-12 cursor-pointer
  hover:bg-blue-200 dark-hover:bg-blue-500 rounded-lg"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M9.47 9.65l-1.41 1.42L11
      14l5.19-5.18-1.41-1.42L11 11.18M17 3H7c-1.1 0-2
      .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2m0 15l-5-2.18L7
      18V5h10z"
              />
            </svg>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);

  if(!localStorage.getItem(USER_LOGIN)){
    alert('You have to Sign-in first to get into this page')
    return <Redirect to='/login'></Redirect>
  }

  return (
    <div>
      <div className="h-screen md:flex min-h-screen bg-gray-800">
        <nav
          className="w-80 pt-28 bg-white  select-none overflow-y-auto
		transition duration-500 ease-in-out"
        >
          <div className="flex flex-col items-center ">
            <h1
              className="text-6xl text-center text-pink-600 dark:text-pink-400 mt-0
				transition duration-500 ease-in-out"
            >
              Zupi Cinema
            </h1>
            <div
              className="capitalize  text-center h-32 w-32 rounded-full bg-indigo-400 object-cover mt-2 mb-6 text-white text-6xl transition
				duration-500 ease-in-out" style={{lineHeight: '2'}}
            >
              {thongTinNguoiDungDefault.taiKhoan?.slice(0, 1)}
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded px-8 "
          >
            <div className="flex justify-end">
              <button
                onClick={() => {
                  dispatch({
                    type: TOGGLE_EDIT,
                    editUser: true
                  });
                }}
                type="button"
                className="rounded bg-green-500 hover:bg-green-600 text-white px-3"
              >
                Edit
              </button>
            </div>
            {editUser ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    disabled
                    onChange={formik.handleChange}
                    value={formik.values.taiKhoan}
                    className="cursor-not-allowed shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                    name="taiKhoan"
                  />
                  {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
                    <div className="text-red-500">{formik.errors.taiKhoan}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.matKhau}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                    name="matKhau"
                    type='password'
                  />
                  {formik.errors.matKhau && formik.touched.matKhau ? (
                    <div className="text-red-500">{formik.errors.matKhau}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.hoTen}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Name"
                    name="hoTen"
                  />
                  {formik.errors.hoTen && formik.touched.hoTen ? (
                    <div className="text-red-500">{formik.errors.hoTen}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    onChange={formik.handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phonenumber
                  </label>
                  <input
                    onChange={formik.handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Phonenumber"
                    name="soDt"
                    value={formik.values.soDt}
                  />
                  {formik.errors.soDt && formik.touched.soDt ? (
                    <div className="text-red-500">{formik.errors.soDt}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="rounded bg-indigo-500 hover:bg-indigo-600 text-white w-full mt-2 p-2"
                  >
                    Save
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      dispatch({
                        type: TOGGLE_EDIT,
                        editUser: false
                      });
                    }}
                    className="rounded bg-red-500 hover:bg-red-600 text-white w-full mt-2 p-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <span>{thongTinNguoiDungDefault.taiKhoan}</span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Password
                  </label>
                  <span>{thongTinNguoiDungDefault.matKhau}</span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Name
                  </label>
                  <span>{thongTinNguoiDungDefault.hoTen}</span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <span>{thongTinNguoiDungDefault.email}</span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Phonenumber
                  </label>
                  <span>{thongTinNguoiDungDefault.soDT}</span>
                </div>
              </div>
            )}
          </form>
        </nav>
        <main
          className="flex-1 pt-20  overflow-y-auto transition
		duration-500 ease-in-out"
        >
          <div
            className="px-24 py-12 text-gray-700 dark:text-gray-500 transition
			duration-500 ease-in-out"
          >
            <h2 className="text-4xl font-medium text-white">
              Booking Ticket History
            </h2>
            <div className="mt-1 mb-4 flex items-center justify-between">
              <span className="text-sm text-white">
                <strong>Hope you enjoy day!</strong>
              </span>
              <div className="flex items-center select-none text-white">
                <span className="hover:text-pink-500 cursor-pointer mr-3">
                  <svg viewBox="0 0 512 512" className="h-5 w-5 fill-current">
                    <path
                      d="M505 442.7L405.3
								343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7
								44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1
								208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4
								2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9
								0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
								0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0
								128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    />
                  </svg>
                </span>
                <input
                  className="bg-transparent focus:outline-none text-white"
                  placeholder="Search in activity"
                />
              </div>
              <button
                className="flex items-center focus:outline-none border
					rounded-full py-2 px-6 leading-none 
					select-none hover:text-pink-600 hover:bg-pink-300 bg-white"
              >
                <svg className="h-5 w-5 fill-current mr-1" viewBox="0 0 24 24">
                  <path
                    d="M12 1L8 5h3v9h2V5h3m2 18H6a2 2 0 01-2-2V9a2 2 0
							012-2h3v2H6v12h12V9h-3V7h3a2 2 0 012 2v12a2 2 0 01-2
							2z"
                  />
                </svg>
                <span>Export</span>
              </button>
              <div className="flex items-center select-none ">
                <span className="text-white">Filter</span>
                <button
                  className="ml-3 bg-white dark:bg-gray-600
						dark:text-gray-400 rounded-full p-2 focus:outline-none
						hover:text-pink-500 hover:bg-pink-300 transition
						duration-500 ease-in-out "
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0
								01-1.41 0l-2.01-2.01a.989.989 0
								01-.29-.83V12h-.03L4.21 4.62a1 1 0
								01.17-1.4c.19-.14.4-.22.62-.22h14c.22 0
								.43.08.62.22a1 1 0 01.17 1.4L14.03 12H14z"
                    />
                  </svg>
                </button>
                <button
                  className="ml-2 bg-white dark:bg-gray-600
						dark:text-gray-400 rounded-full p-2 focus:outline-none
						hover:text-pink-500 hover:bg-pink-300 transition
						duration-500 ease-in-out"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
								19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"
                    />
                  </svg>
                </button>
                <button
                  className="ml-2 bg-white dark:bg-gray-600
						dark:text-gray-400 rounded-full p-2 focus:outline-none
						hover:text-pink-500 hover:bg-pink-300 transition
						duration-500 ease-in-out"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4
								4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21
								3.58-4 8-4z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="border dark:border-gray-700 transition duration-500
				ease-in-out"
            />
            <div className="flex flex-col mt-2">{renderCardTicket()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
