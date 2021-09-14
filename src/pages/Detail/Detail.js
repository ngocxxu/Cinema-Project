import React, { useEffect } from "react";
import { Button } from "@tsamantanis/react-glassmorphism";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/circle.css";
import { Tabs, Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SET_CHI_TIET_PHIM } from "../../redux/const/settingConst";
import { layThongTinChiTietPhimAction } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function Detail(props) {
  const { filmDetail } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //lấy thông tin param từ url
    //bóc tách giá trị id từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhimAction(id));
  }, []);

  return (
    <div
      className="bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        minHeight: "100vh",
      }}
    >
      <CustomCard
        className="min-h-screen"
        effectColor="#fFF" // required
        color="#fFF" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12 my-20">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3">
              <img
                className="col-span-1"
                src={filmDetail.hinhAnh}
                alt={filmDetail.hinhAnh}
              ></img>
              <div className="col-span-2 ml-5">
                <p className="">
                  Opening day:{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD/MM/YYYY")}
                </p>
                <p className="text-3xl">{filmDetail.tenPhim}</p>
                <p className="text-xl">Description</p>
                <p>{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4 ">
            <div className="flex flex-col align-center justify-center">
              <div className={`c100 p${filmDetail.danhGia * 10} big mx-auto`}>
                <span className="text-white">{filmDetail.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
              <div className="mx-auto">
                <Rate allowHalf defaultValue={filmDetail.danhGia / 2} />
                <p className="text-center">Review</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 container mx-auto bg-white p-5">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Showtimes" key="1">
              <div>
                <Tabs className=" " tabPosition={"left"}>
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        className=""
                        tab={
                          <div className="text-center mx-auto ">
                            <img
                              className="mx-auto rounded-full"
                              src={htr.logo}
                              width="50"
                              alt={htr.heThongRap}
                            />
                            {htr.tenHeThongRap}
                          </div>
                        }
                        key={index}
                      >
                        {htr.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div key={index} className="">
                              <div className="flex ">
                                <img
                                  src={cumRap.hinhAnh}
                                  alt={cumRap.tenCumRap}
                                  width="60"
                                ></img>
                                <div className="ml-2 ">
                                  <p className=" text-lg font-semibold">
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p className="text-gray-500">
                                    {cumRap.diaChi}
                                  </p>
                                </div>
                              </div>
                              <div className="thong-tin-lich-chieu grid grid-cols-4">
                                {cumRap.lichChieuPhim?.slice(0,12).map(
                                  (lichChieu, index) => {
                                    return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1">
                                      {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                    </NavLink>;
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Information" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Review" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
