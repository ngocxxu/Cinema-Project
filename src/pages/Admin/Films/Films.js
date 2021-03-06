import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { Input, Space } from "antd";
import { AudioOutlined, CalendarOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimAction, xoaPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

const { Search } = Input;

export default function Films(props) {
  const { arrFilmDefaults } = useSelector((state) => state.QuanLyPhimReducer);
  console.log({ arrFilmDefaults });
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Movie code",
      dataIndex: "maPhim",
      render: (text, film) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirection: ["descend", "ascend"],
      width: "10%",
      // sortOrder: ['descend']
    },
    {
      title: "Poster",
      dataIndex: "hinhAnh",
      width: "10%",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              key={index}
              width="50"
              src={film.hinhAnh}
              alt={film.tenPhim}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/75`;
              }}
            ></img>
          </Fragment>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      width: "20%",

      render: (text, film, index) => {
        return <p className="text-green-600 text-xl">{text}</p>;
      },
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Description",
      dataIndex: "moTa",
      width: "40%",

      render: (text, film, index) => {
        return (
          <Fragment>
            {film.moTa.length > 50 ? (
              <span className="text-gray-600">
                {film.moTa.substr(0, 150) + " ..."}
              </span>
            ) : (
              <span className="text-gray-600">{film.moTa}</span>
            )}
          </Fragment>
        );
      },
      // sorter: (a, b) => {
      //   let tenPhimA = a.tenPhim.toLowerCase().trim();
      //   let tenPhimB = b.tenPhim.toLowerCase().trim();
      //   if (tenPhimA > tenPhimB) {
      //     return 1;
      //   }
      //   return -1;
      // },
    },
    {
      title: "Action",
      dataIndex: "maPhim",

      render: (text, film, index) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="bg-blue-400 text-white text-2xl p-2 rounded hover:text-yellow-300"
              to={`/admin/films/edit/${film.maPhim}`}
            >
              <EditOutlined className=""></EditOutlined>
            </NavLink>
            <span
              key={2}
              className="cursor-pointer bg-red-400 text-white text-2xl p-2 ml-2 rounded hover:text-yellow-300"
              to="/"
              onClick={() => {
                if(window.confirm('Do you want to delete it' + film.tenPhim + '?')){
                dispatch(xoaPhimAction(film.maPhim))

                }
              }}
            >
              <DeleteOutlined></DeleteOutlined>
            </span>
            <NavLink
              key={3}
              className="bg-yellow-400 text-white text-2xl p-2 ml-2 rounded hover:text-yellow-300"
              to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                //ch???a th??ng tin phim m?? ko c???n ph???i x???t nhi???u tr??n url, truy???n nh??u params
                //n?? s??? l??u th??ng tin d?????i localStorage v?? m??nh s??? ???y th??ng tin ???? ????? hi???n th??? l??n giao di???n
                localStorage.setItem('filmParams',JSON.stringify(film))

              }}
            >
              <CalendarOutlined />
            </NavLink>
          </Fragment>
        );
      },
    },
  ];

  const data = arrFilmDefaults;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (value) => {
    //g???i api
    dispatch(layDanhSachPhimAction(value))
  };

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);
  return (
    <div className="">
      <h3 className="text-2xl">Films Management</h3>
      {/* <Button
        onClick={() => {
          history.push("/admin/films/addnew");
        }}
        className="mb-3"
      >
        Add Films
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
        rowKey={"maPhim"}
      />
    </div>
  );
}
