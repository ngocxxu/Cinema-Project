import React from "react";
import { useFormik, yupToFormErrors } from "formik";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dangKyAction, dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import * as Yup from "yup";
import { GROUPID } from "../../util/setting/config";

export default function Register(props) {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  // console.log('userLogin',userLogin)
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
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
      dispatch(dangKyAction(values));
    }
  });

  return (
    <form
      onSubmit={(e) => {
        //chặn page F5 lại trang
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className="lg:w-1/2 xl:max-w-screen-sm"
    >
      <div className="py-12 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <svg
              className="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              style={{ enableBackground: "new 0 0 225 225" }}
              xmlSpace="preserve"
            >
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                "
                }}
              />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    className="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            ZUPI CINEMA
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          Sign up
        </h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Account Name
              </div>
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type
                placeholder="Your account name"
              />
              {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
                <div className="text-red-500">{formik.errors.taiKhoan}</div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <div>
                  {/* <a
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer"
                  >
                    Forgot Password?
                  </a> */}
                </div>
              </div>
              <input
                type="password"
                name="matKhau"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
              />
              {formik.errors.matKhau && formik.touched.matKhau ? (
                <div className="text-red-500">{formik.errors.matKhau}</div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-8">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Name
              </div>
              <input
                name="hoTen"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type
                placeholder="Your name"
              />
              {formik.errors.hoTen && formik.touched.hoTen ? (
                <div className="text-red-500">{formik.errors.hoTen}</div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-8">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Email
              </div>
              <input
                name="email"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type
                placeholder="Your email"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : (
                ""
              )}
            </div>

            <div className="mt-8">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Phone Number
              </div>
              <input
                name="soDt"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type
                placeholder="Your phone number"
              />
              {formik.errors.soDt && formik.touched.soDt ? (
                <div className="text-red-500">{formik.errors.soDt}</div>
              ) : (
                ""
              )}
            </div>

            <div className="mt-10">
              <button
                // type="button"
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Have already an account ?{" "}
            <NavLink
              to="/login"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Log in
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
