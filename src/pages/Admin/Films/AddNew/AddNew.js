import React, { useState } from 'react';
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
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../util/setting/config';

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('')
  const dispatch = useDispatch()

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    initialValues:{
      tenPhim: '',
      trailer:'',
      moTa:'',
      ngayKhoiChieu:'',
      dangChieu:false,
      sapChieu:false,
      hot:false,
      danhGia:0,
      hinhAnh:{},
      // maNhom: GROUPID
    },
    onSubmit: (values)=>{
      values.maNhom = GROUPID;
      console.log({values})
      //tạo đối tượng FormData của JSON có sẵn => đưa gtri values từ formik vào formdata
      let formData = new FormData();

      for(let key in values){
        formData[key] = values[key];
        formData.append(key, values[key]);
        if(key === 'hinhAnh'){
          //formData chứa dữ liệu dùng append
          //formik.hinhAnh.name: là abc.png
          //phải gửi đủ 3 tham số
          formData.append('File',values.hinhAnh,values.hinhAnh.name);
        }else{
          formData[key] = values[key];
        }
      }
      //gọi api gửi các gtri formdata về BE xử lý
      dispatch(themPhimUploadHinhAction(formData))

      //mún consolelog xem giá trị value từ formik phải dùng get
      //do tính bảo mật của FormData nên ta chỉ thấy KQ trả về là 1 obj rỗng
      //mún nhìn thấy value của thuộc tính thì dùng get để truy xuất
      // console.log('formik',formData.get('tenPhim'))
    }
  })

  const handleChangeDatePicker=(value)=>{
    console.log('date picker', moment(value).format('DD/MM/YYYY'));
    //truyền giá trị của handleChangeDatePicker vào trường initialValues để fill gtri cho ngayKhoiChieu
    let ngayKhoiChieu =moment(value).format('DD/MM/YYYY');
    formik.setFieldValue('ngayKhoiChieu',ngayKhoiChieu)
  }

  //cách viet giống redux thunk
  //sử dụng closures function,  function(name)(value)
  //nó dc dùng khi mà 1 số trường input của antd ko có thuộc tính name hay thuộc tính khác
  //truy cập vào phạm vi của một hàm bên ngoài từ một hàm bên trong
  const handleChangeSwitch=(name)=>{

    //bạn phải viet thêm 1 hàm để nhận gtri value, vì nếu bạn truyền (name,value) cho hàm trên thì value sẽ báo lỗi
    return (value)=>{formik.setFieldValue(name,value)}
  }

  const handleChangeInputNumber=(reviewNumber)=>{
    return (value)=>{formik.setFieldValue(reviewNumber,value)}
  }

  const handleChangeFile = (e)=>{
    //lấy mã file từ sự kiện event
    //ta chỉ chọn 1 hình đầu tiên nên ghi thêm [0]
    let file = e.target.files[0]

      //tạo đối tượng đọc file 
      //đối tượng FileReader có sẵn của JS
      let reader = new FileReader();
      //đọc file r trả về URL
      reader.readAsDataURL(file)
      //nhận thuộc tính URL thông qa sự kiện onload
      //nó sẽ trả về result là load base 64
      reader.onload = (e)=>{
        // console.log(e.target.result);
        setImgSrc(e.target.result); //hình base 64
      }
    

    //đem dữ liệu file lưu vào formik
    formik.setFieldValue('hinhAnh',file)

  }

  return (
    <>
      <Form
      onSubmitCapture = {formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
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
        <Form.Item label="Film Name">
          <Input name='tenPhim' onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name='trailer' onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Description">
          <Input name='moTa' onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Showing Date">
          <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker}/>
        </Form.Item>
        <Form.Item label="Now Showing" valuePropName="checked">
          <Switch name='dangChieu' onChange={handleChangeSwitch('dangChieu')}/>
        </Form.Item>
        <Form.Item label="Coming Soon">
          <Switch  name='sapChieu' onChange={handleChangeSwitch('sapChieu')}/>
        </Form.Item>
        <Form.Item label="Hot">
          <Switch  name='hot' onChange={handleChangeSwitch('hot')}/>
        </Form.Item>
        <Form.Item label="Star Rating">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10}/>
        </Form.Item>
        <Form.Item label="Picture">
          <input type='file' onChange={handleChangeFile}/>
          {/* src = "data:image/png;base64, mã chuỗi" */}
          <img style={{width:200, height:200}} src={imgSrc} alt='...' ></img>
        </Form.Item>
        <Form.Item label="Button">
          <button type='submit' className='bg-blue-400 text-white p-2 rounded'>Add Film</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew
