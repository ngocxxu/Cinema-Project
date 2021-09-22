import React, { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import "./Film_Flip.css";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_MODAL } from "../../redux/const/settingConst";
import { layThongTinPhimAction } from "../../redux/actions/QuanLyPhimAction";
import "@material-tailwind/react/tailwind.css";


export default function Film_Flip(props) {
  // const [showModal, setShowModal] = React.useState(false);
  const { item } = props;
  const dispatch = useDispatch();

  return (
    <div className="flip-card mt-3 mb-10 rounded">
      <div className="flip-card-inner rounded">
        <div className="flip-card-front rounded">
          <img
          className='flip-img-front rounded'
            src={item.hinhAnh}
            alt="Avatar"
            // style={{ width: 300, height: 300 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/300/300";
            }}
          />
        </div>
        <div
          className="flip-card-back rounded"
          style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
        >
          <div className="rounded" style={{ position: "absolute", top: 0, left: 0 }}>
            <img
            className='flip-img-back rounded'
              src={item.hinhAnh}
              alt="Avatar"
              // style={{ width: 300, height: 300 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/300/300";
              }}
            />
          </div>
          <div
            className="w-full h-full rounded"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div>
              <div
                className="rounded-full cursor-pointer"
                type="button"
                onClick={() => {
                  dispatch({
                    type: SHOW_MODAL,
                    showModal: true
                  });
                  dispatch(layThongTinPhimAction(item.maPhim))
                }}
              >
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>

              <div className="rounded text-2xl mt-2 font-bold">{item.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          onClick={() => {
            history.push(`/detail/${item.maPhim}`);
          }}
          className="rounded text-white text-center cursor-pointer py-2 bg-green-700  text-success-50 font-bold hover:bg-red-700 "
        >
          Booking Ticket
        </div>
      </div>
    </div>
  );
}
