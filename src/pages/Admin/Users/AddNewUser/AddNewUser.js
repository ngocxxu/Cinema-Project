import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/QuanLyPhimAction";
import { GROUPID } from "../../../../util/setting/config";
import { capNhatThongTinNguoiDungAction, dangKyAction, layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungAction";
import * as Yup from "yup";
import { useEffect } from "react";

const AddNewUser = () => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const {arrTypeUser} = useSelector(state => state.QuanLyNguoiDungReducer)
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung: "",
      maNhom: GROUPID,
    },
    validationSchema: Yup.object().shape({
      hoTen: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Name can not a number")
        .required("Name can not be empty!"),
      taiKhoan: Yup.string()
        .min(6, "Account name must be at least 6 characters")
        .max(20, "Account name must be at maximum 32 characters")
        .required("Account name can not be empty!"),
      matKhau: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be at maximum 32 characters")
        .required("Password can not be empty!"),
      email: Yup.string()
        .email("Email is invalid!")
        .required("Email can not be empty!"),
      soDt: Yup.string()
        .min(6, "Phone number must be at least 6 characters")
        .matches(/^[0-9]+$/, "Phone number can not a character")
        .required("Phone number can not be empty!")
    }),

    onSubmit: (values) => {
      console.log({values})
      dispatch(themNguoiDungAction(values));

      //mún consolelog xem giá trị value từ formik phải dùng get
      //do tính bảo mật của FormData nên ta chỉ thấy KQ trả về là 1 obj rỗng
      //mún nhìn thấy value của thuộc tính thì dùng get để truy xuất
      // console.log('formik',formData.get('tenPhim'))
    }
  });


  const handleChangeInputNumber = (phoneNumber) => {
    return (value) => {
      formik.setFieldValue(phoneNumber, value);
    };
  };

  const handleChangeTypeUser=(maLoaiNguoiDung)=>{
    formik.setFieldValue('maLoaiNguoiDung',maLoaiNguoiDung)
  }

  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction())

  }, [])

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 14
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="User Name">
          <Input name="taiKhoan" onChange={formik.handleChange} />
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <div className="text-red-500">{formik.errors.taiKhoan}</div>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Password">
          <Input type='password' name="matKhau" onChange={formik.handleChange} />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <div className="text-red-500">{formik.errors.matKhau}</div>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Name">
          <Input name="hoTen" onChange={formik.handleChange} />
          {formik.errors.hoTen && formik.touched.hoTen ? (
            <div className="text-red-500">{formik.errors.hoTen}</div>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Phone Number">
          <InputNumber onChange={handleChangeInputNumber("soDt")} />
          {formik.errors.soDt && formik.touched.soDt ? (
            <div className="text-red-500">{formik.errors.soDt}</div>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Type User">
        <Select
            options={arrTypeUser?.map((type, index) => {
              return { label: type.tenLoai, value: type.maLoaiNguoiDung };
            })}
            onChange={handleChangeTypeUser}
            placeholder="Please select"
          />
        </Form.Item>
        <Form.Item label="Action">
          <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
            Create User
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNewUser;
