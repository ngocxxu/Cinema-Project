import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Route} from "react-router"
import HomeCarousel from './Layout/Carousel/HomeCarousel';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';

export default function HomeTemplate(props) {

  const {userLogin} = useSelector((state) => state.QuanLyNguoiDungReducer);

  const {Component,...restRoute} = props;

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // })

  return (
    <Route {...restRoute} render={(propsRoute)=>{
      return <Fragment>
        {/* //thành phần dùng chung */}
        <Header {...propsRoute}></Header>
        <Component {...propsRoute}></Component>
        <Footer {...propsRoute}></Footer>
      </Fragment>
    }}>
      
    </Route>
  )
}


//propsRoute
//chứa location, history, map để xét tham số trên URL => props.location,...

//restRoute: nhận vô 1 cái path, nếu path hợp lý thì chạy hàm render ra
//chứa Component, exact, path,...