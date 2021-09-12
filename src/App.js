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
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/home" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/contact" exact Component={Contact}></HomeTemplate>
        <HomeTemplate path="/news" exact Component={News}></HomeTemplate>
        <Router path="/login" exact Component={Login}></Router>
        <Router path="/register" exact Component={Register}></Router>
      </Switch>
    </Router>
  );
}

export default App;
