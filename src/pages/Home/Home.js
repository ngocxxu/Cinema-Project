import React, { useEffect, useState } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
//Kết nối redux
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Films/Film';
import MultipleRowSlickkk from '../../components/ReactSlick/MultipleRowSlickkk';
import MultipleRowSlick from '../../components/ReactSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';

export default function Home(props) {

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();

    // props.match.params
    // const renderFilms = () => {
    //     return arrFilm.map((phim, index) => {
    //         return <Film key={index} />
    //     })
    // }

    useEffect(()=>{
        //dispatch function từ thunk
        dispatch(layDanhSachPhimAction())
    },[])
    
    return (
        <div>
            <section className="text-gray-600 body-font" >
                <div className="container px-5 py-24 mx-auto " >
                <MultipleRowSlickkk arrFilm={arrFilm}></MultipleRowSlickkk>
                    {/* <MultipleRowSlick  arrFilm={arrFilm}></MultipleRowSlick> */}
                    {/* <div className="flex flex-wrap  " style={{ justifyContent: 'center' }}>
                        {renderFilms()}
                    </div> */}
                </div>
            </section>
            <div className="mx-36">
                <HomeMenu  />
            </div>
        </div>
    )
}