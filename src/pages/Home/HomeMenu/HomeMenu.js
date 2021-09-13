import React, { Fragment, useState } from "react";
import { Tabs, Radio, Space } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { heThongRapChieu } = props;

  const [state, setState] = useState({ tabPosition: "left" });

  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };

  const renderHeThongRap = () => {
    return heThongRapChieu.map((heThongRap, index) => {
      return (
        <TabPane
          tab={
            <img
              src={heThongRap.logo}
              className="rounded-full"
              width="50"
            ></img>
          }
          key={index}
        >
          <Tabs key={index} tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div className="flex " style={{ width: "300px" }}>
                      <img
                        src="http://megaman.com.vn/uploads/project/2019_05/e5dfa9d51546fb18a257.jpg?1557198680018"
                        className=""
                        width="70"
                      ></img>
                      <div className="text-left ml-2">
                        {cumRap.tenCumRap}
                        <p>Detail</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="flex my-2">
                          <div className="flex">
                            <img
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/100/100";
                              }}
                              style={{ width: "100px" }}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                            ></img>
                            <div className="ml-2">
                              <h2 className="text-xl ">{phim.tenPhim}</h2>
                              <p>{cumRap.diaChi}</p>
                              <div className="grid grid-cols-7 gap-4">
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 14)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className="text-lg "
                                        to="/"
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("HH:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  const { tabPosition } = state;
  return (
    <div>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </div>
  );
}
