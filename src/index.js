import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DOMAIN } from "./util/setting/config";

//cấu hình realtime
import * as signalR from '@aspnet/signalr'

//đoạn code này dùng để kết nối đến server và lắng nge sự kiện từ server
//ng dùng vừa mở ứng dụng web là đoạn code này dc cài đặt ngầm trong WSocket của họ
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${DOMAIN}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

  //connection như 1 giao thức kết nối, luôn luôn lắng nghe từ server
  connection.start().then(()=>{
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  }).catch((err)=>{console.log("Error",err)})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

