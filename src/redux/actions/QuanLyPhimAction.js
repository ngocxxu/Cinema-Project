import React from 'react'
import { quanLyPhimService } from '../../services/QuanLyPhimService'
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from '../const/settingConst';
import {history} from '../../App'




export const layDanhSachPhimAction = (tenPhim='')=>{
  return async (dispatch) => {
    try{
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      })
    }catch(err){console.log('err',err)}
  }
}

export const themPhimUploadHinhAction =(formData)=>{
  return async (dispatch) => {
    try{
      const result = await quanLyPhimService.themPhimUploadHinh(formData);
      console.log({result})


    }catch(err){console.log('err',err)}
  }
}

export const layThongTinPhimAction = (maPhim)=>{
  return async (dispatch) => {
    try{
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      console.log({result})
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content
      })

    }catch(err){console.log('err',err)}
  }
}

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
      try {
          let result = await quanLyPhimService.capNhatPhimUpload(formData);
          alert('Update success!')
          console.log('result', result.data.content);

          dispatch(layDanhSachPhimAction());
          history.push('/admin/films');
          
      } catch (errors) {
          console.log(errors.response?.data)
      }
  }
}

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
      try {
          let result = await quanLyPhimService.xoaPhim(maPhim);
          console.log('result', result.data.content);
          alert('Delete success!')


          dispatch(layDanhSachPhimAction());
          
      } catch (errors) {
          console.log(errors.response?.data)
      }
  }
}