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

const { TabPane } = Tabs;

export default function Detail(props) {

  const {filmDetail} = useSelector(state => state.QuanLyPhimReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    //lấy thông tin param từ url
    //bóc tách giá trị id từ url
    let {id} = props.match.params;
    dispatch(layThongTinChiTietPhimAction(id))
  }, [])

  return (
    <div
      className="bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${filmDetail.hinhAnh})`,minHeight:'100vh' }}
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
              <img className='col-span-1' src={filmDetail.hinhAnh} alt={filmDetail.hinhAnh}></img>
              <div  className='col-span-2 ml-5'>
              <p className='' >Opening day: {moment(filmDetail.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                <p className='text-3xl'>{filmDetail.tenPhim}</p>
                <p className='text-xl' >Description</p>
                <p>{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4 ">
            <div className={`c100 p${filmDetail.danhGia*10} big`}>
              <span className='text-white'>{filmDetail.danhGia*10}%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
            
          </div>
        </div>
        <div className="mt-20 container mx-auto">
          <Tabs tabPosition={"left"}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab 3
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
