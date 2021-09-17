import React, { Fragment, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { history } from "../../App";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import zupi from '../../assets/img/logozupiiiiii.png'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminTemplate(props) {
  const { Component, ...restProps } = props;
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [collapse, setCollapse] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // if(!localStorage.getItem(USER_LOGIN)){
  //   alert('You do not have permission into the page')
  //   return <Redirect to='/'></Redirect>
  // }

  // if(userLogin.maLoaiNguoiDung !== 'QuanTri'){
  //   alert('You do not have permission into the page')
  //   return <Redirect to='/'></Redirect>
  // }

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
            <div className="w-16 h-16 rounded-full bg-yellow-500 flex justify-center items-center">
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
            {/* Hello, {userLogin.taiKhoan} */}
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

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
                <div className="logo">
                  <img src={zupi} alt='zupi'></img>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="users">Users</NavLink>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<FileOutlined />}>
                    <NavLink to="films">Films</NavLink>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<DesktopOutlined />}>
                    <NavLink to="showtimes">Showtime</NavLink>
                  </Menu.Item>
                  {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item> */}
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div
                    className="text-right pr-10 "
                  >{operations}</div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <Component {...propsRoute}></Component>
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Zupi Cinema ©2021 Created by me
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
}
