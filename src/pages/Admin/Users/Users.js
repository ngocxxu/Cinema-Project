import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { Input, Space } from "antd";
import {
  AudioOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhimAction,
  xoaPhimAction
} from "../../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import { layDanhSachLoaiNguoiDungAction, layDanhSachNguoiDungAction, xoaNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";

const { Search } = Input;

export default function Users(props) {
  // const { arrFilmDefaults } = useSelector((state) => state.QuanLyPhimReducer);
  const { arrUserDefault } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  // console.log({ arrUserDefault });
  const dispatch = useDispatch();

  const columns = [
    {
      title: "User Name",
      dataIndex: "taiKhoan",
      render: (text, User) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
      sortDirection: ["descend", "ascend"],
      width: "15%"
      // sortOrder: ['descend']
    },
    {
      title: "Password",
      dataIndex: "matKhau",
      width: "15%",
      render: (text, User, index) => {
        return (
          <Fragment>
            <span>{text}</span>;{" "}
          </Fragment>
        );
      },
      sorter: (a, b) => a.matKhau - b.matKhau,
      sortDirection: ["descend", "ascend"],
    },
    {
      title: "Name",
      dataIndex: "hoTen",
      width: "15%",

      render: (text, User, index) => {
        return <p className="">{text}</p>;
      },
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",

      render: (text, User, index) => {
        return (
          <Fragment>
            <span className="text-gray-600">{User.email}</span>
          </Fragment>
        );
      },
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      }
    },
    {
      title: "Phone Number",
      dataIndex: "soDt",
      render: (text, User) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.soDt - b.soDt,
      sortDirection: ["descend", "ascend"],
      width: "15%"
      // sortOrder: ['descend']
    },
    {
      title: "User Type",
      dataIndex: "maLoaiNguoiDung",
      width: "15%",

      render: (text, User, index) => {
        return (
          <Fragment>
            <span className="text-gray-600">{User.maLoaiNguoiDung}</span>
          </Fragment>
        );
      },
      sorter: (a, b) => {
        let maLoaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim();
        let maLoaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (maLoaiNguoiDungA > maLoaiNguoiDungB) {
          return 1;
        }
        return -1;
      }
    },
    {
      title: "Action",
      dataIndex: "maPhim",

      render: (text, User, index) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="bg-blue-400 text-white text-2xl p-2 rounded hover:text-yellow-300"
              to={`/admin/users/edituser/${User.taiKhoan}`}
            >
              <EditOutlined className=""></EditOutlined>
            </NavLink>
            <span
              key={2}
              className="cursor-pointer bg-red-400 text-white text-2xl p-2 ml-2 rounded hover:text-yellow-300"
              to="/"
              onClick={() => {
                if (
                  window.confirm(
                    "Do you want to delete it" + User.taiKhoan + "?"
                  )
                ) {
                  dispatch(xoaNguoiDungAction(User.taiKhoan));
                }
              }}
            >
              <DeleteOutlined></DeleteOutlined>
            </span>
          </Fragment>
        );
      }
    }
  ];

  const data = arrUserDefault;
  // console.log({data})

  function onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (value) => {
    //gọi api
    dispatch(layDanhSachNguoiDungAction(value));
  };

  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());

  }, []);
  return (
    <div className="">
      <h3 className="text-2xl">User Management</h3>
      {/* <Button
        onClick={() => {
          // dispatch(layDanhSachLoaiNguoiDungAction());
          history.push("/admin/users/addnewuser");
        }}
        className="mb-3"
      >
        Add Users
      </Button> */}
      <Search
        className="mb-3"
        placeholder="input search"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}
