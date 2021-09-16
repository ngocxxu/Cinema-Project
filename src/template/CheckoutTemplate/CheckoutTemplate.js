import React, { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { USER_LOGIN } from "../../util/setting/config";

export default function CheckoutTemplate(props) {
  const { Component, ...restRoute } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  //nếu localStorage ko có thì chuyển user về trang login
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Component {...propsRoute}></Component>
          </Fragment>
        );
      }}
    ></Route>
  );
}

//propsRoute
//chứa location, history, map để xét tham số trên URL => props.location,...

//restRoute: nhận vô 1 cái path, nếu path hợp lý thì chạy hàm render ra
//chứa Component, exact, path,...
