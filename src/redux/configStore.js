import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';

const rootReducer = combineReducers({
  CarouselReducer,
  QuanLyPhimReducer:QuanLyPhimReducer,
  QuanLyRapReducer:QuanLyRapReducer,

});

export const store = createStore(rootReducer, applyMiddleware(thunk));

 