import axios from "axios";
import { layDanhSachBanner, quanLyPhimService } from "../../services/QuanLyPhimService";
import { DOMAIN } from "../../util/setting/config";
import { SET_CAROUSEL } from "../const/settingConst";

export const getCarouselAction = (param)=>{
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachBanner()
      //đưa lên reducers
      console.log("result", result);

      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content,
      });
    } catch (err) {
      console.log("err", err);
    }
  };
}

