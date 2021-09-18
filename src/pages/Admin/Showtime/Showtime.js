/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { Cascader } from "antd";
import { DatePicker, Space } from "antd";
import { InputNumber } from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

const { RangePicker } = DatePicker;

export default function Showtime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values)=>{
      // console.log("values",values)
      try{
        const result = await quanLyDatVeService.taoLichChieu(values)
        alert(result.data.content)
      }catch(err){console.log('err', err.response?.data)}
    }
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  useEffect(async () => {
    try {
      const result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (err) {
      console.log("err", err.response?.data);
    }
  }, []);

  //hàm này lấy ra cụm rạp cho mình
  const handleChangeHeThongRap = async (value, option) => {
    // console.log('maHeThongRap',value) // "CGV"
    try {
      const result = await quanLyRapService.layCumRap(value);
      setState({ ...state, cumRapChieu: result.data.content });
    } catch (err) {
      console.log("err", err.response?.data);
    }
  };
  const onChangeDate = (values, dateString) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log("changed", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value)
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  let film={};
  if(localStorage.getItem("filmParams")){
    film = JSON.parse(localStorage.getItem("filmParams"));
  }
  return (
    <div className="container mx-auto">
      <Form
        onSubmitCapture={formik.handleSubmit}
        
        name="basic"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 16,
        // }}
        // initialValues={{
        //   remember: true,
        // }}
      >
        <h3 className="text-2xl">Calendar Creating - {props.match.params.tenPhim}</h3>
        <img src={film.hinhAnh} alt='...' width={200} height={200} />
        <Form.Item label="Cinema System">
          <Select
            options={state.heThongRapChieu.map((heThongRap, index) => {
              //label là giá trị hiển thị mà ng dùng thấy, còn value là gtri ng dùng chọn để gui lên api
              return {
                label: heThongRap.tenHeThongRap,
                value: heThongRap.tenHeThongRap,
              };
            })}
            onChange={handleChangeHeThongRap}
            placeholder="Please select"
          />
        </Form.Item>
        <Form.Item label="Cinema Group">
          <Select
            options={state.cumRapChieu?.map((cumRap, index) => {
              return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
            })}
            onChange={handleChangeCumRap}
            placeholder="Please select"
          />
        </Form.Item>

        <Form.Item label="Date & Time Picker">
          <Space direction="vertical" size={12}>
            <DatePicker
              showTime
              onChange={onChangeDate}
              onOk={onOk}
              format="DD/MM/YYYY hh:mm:ss"
            />
          </Space>{" "}
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber
            onChange={onChangeInputNumber}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
