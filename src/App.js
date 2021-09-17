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
import CheckoutTemplate from "./template/CheckoutTemplate/CheckoutTemplate";
import UserTemplate from "./template/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./template/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import Users from "./pages/Admin/Users/Users";
import Showtime from "./pages/Admin/Showtime/Showtime";

//delay load trang cho html để giao diện hiện ra full, giống như delay api
//lấy CheckoutTemplateLazy bọc CheckoutTemplate
// const CheckoutTemplateLazy = lazy(()=> import('./template/CheckoutTemplate/CheckoutTemplate'))

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
    <Loading></Loading>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/contact" exact Component={Contact}></HomeTemplate>
        <HomeTemplate path="/news" exact Component={News}></HomeTemplate>
        <HomeTemplate path="/detail/:id" exact Component={Detail}></HomeTemplate>
        <HomeTemplate path="/profile" exact Component={Profile}></HomeTemplate>
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout}></CheckoutTemplate>
        <UserTemplate path="/register" exact Component={Register}></UserTemplate>
        <UserTemplate path="/login" exact Component={Login}></UserTemplate>
        <AdminTemplate path="/admin" exact Component={Dashboard}></AdminTemplate>
        <AdminTemplate path="/admin/films" exact Component={Films}></AdminTemplate>
        <AdminTemplate path="/admin/users" exact Component={Users}></AdminTemplate>
        <AdminTemplate path="/admin/showtimes" exact Component={Showtime}></AdminTemplate>
        <HomeTemplate path="/" exact Component={Home}></HomeTemplate>

        {/* <Suspense fallback={<h1>LOADING...</h1>}>
        <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout}></CheckoutTemplateLazy>
        </Suspense> */}
      </Switch>
    </Router>
  );
}

export default App;
