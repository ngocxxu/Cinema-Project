import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import LoadingReducer from './reducers/LoadingReducer';

const rootReducer = combineReducers({
  CarouselReducer,
  QuanLyPhimReducer:QuanLyPhimReducer,
  QuanLyRapReducer:QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer:QuanLyDatVeReducer,
  QuanLyNguoiDungReducer:QuanLyNguoiDungReducer,
  LoadingReducer:LoadingReducer,

});

export const store = createStore(rootReducer, applyMiddleware(thunk));

 