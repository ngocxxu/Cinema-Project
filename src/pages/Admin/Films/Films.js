import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { Input, Space } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimAction } from "../../../redux/actions/QuanLyPhimAction";
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
      width: '10%',
      // sortOrder: ['descend']
    },
    {
      title: "Poster",
      dataIndex: "hinhAnh",
      width: '10%',
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
      width: '20%',

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
      width: '40%',

      render: (text, film, index) => {
        return (
          <Fragment>
            {film.moTa.length > 50 ? (
              <span className="text-gray-600">{film.moTa.substr(0, 150) + ' ...'}</span> 
            ) : (
              <span className="text-gray-600">{film.moTa}</span>
            )}
          </Fragment>
        );
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
      title: "Action",
      dataIndex: "hanhDong",

      render: (text, film, index) => {
        return (
          <Fragment>
          <NavLink className="bg-blue-400 text-white text-2xl p-2 mr-2 rounded hover:text-yellow-300" to='/'><EditOutlined className=""></EditOutlined></NavLink>
          <NavLink className="bg-red-400 text-white text-2xl p-2 ml-2 rounded hover:text-yellow-300" to='/'><DeleteOutlined></DeleteOutlined></NavLink>
          </Fragment>
        );
      },
    },
  ];

  const data = arrFilmDefaults;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (value) => console.log(value);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);
  return (
    <div className="">
      <h3 className="text-2xl">Films Management</h3>
      <Button onClick={()=>{
        history.push('/admin/films/addnew')
      }} className="mb-3">Add Films</Button>
      <Search
        className="mb-3"
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}
