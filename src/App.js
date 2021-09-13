import "./App.css";
import { Router,Switch } from "react-router";

//cấu hình history
import { createBrowserHistory } from "history";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import News from "./pages/News/News";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import { Suspense,lazy } from "react";

//delay load trang cho html để giao diện hiện ra full, giống như delay api
//lấy CheckoutTemplateLazy bọc CheckoutTemplate
const CheckoutTemplateLazy = lazy(()=> import('./template/CheckoutTemplate/CheckoutTemplate'))

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/home" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/contact" exact Component={Contact}></HomeTemplate>
        <HomeTemplate path="/news" exact Component={News}></HomeTemplate>
        <HomeTemplate path="/detail/:id" exact Component={Detail}></HomeTemplate>
        <Router path="/login" exact Component={Login}></Router>
        <Router path="/register" exact Component={Register}></Router>
        <Suspense fallback={<h1>LOADING...</h1>}>
        <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout}></CheckoutTemplateLazy>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
