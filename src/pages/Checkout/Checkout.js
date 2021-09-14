import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { layChiTietPhongVeAction } from "../../redux/actions/QuanLyDatVeAction";
import style from "./Checkout.module.css";

export default function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //gửi mã id của url cho API
    dispatch(layChiTietPhongVeAction(props.match.params.id))
  }, [])
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div className="bg-black w-4/5 "> v</div>
            <div className={`${style['trapezoid']}`}>
              <div className="mt-3 text-center text-gray-900">Screen</div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-2xl text-green-600">0 đ</h3>
          <hr />
          <h3 className="text-xl">Lật Mặt: 48h</h3>
          <p>Địa điểm</p>
          <p>Ngày chiếu</p>
          <hr />
          <div className="flex justify-between align-center">
            <div className="text-red-400">Seat</div>
            <div className="text-green-600">0 đ</div>
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
          <hr />
          <div className="h-full flex flex-col justify-end items-center">
            <div className="bg-green-500 text-white w-full text-center p-4 rounded hover:bg-green-600 cursor-pointer">
              Booking Ticket
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
