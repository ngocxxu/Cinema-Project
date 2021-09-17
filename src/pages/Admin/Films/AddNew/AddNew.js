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

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('')

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
    },
    onSubmit: (values)=>{
      console.log({values})

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

    if(file.type === 'image/jpg '|| file.type === 'image/gif'|| file.type === 'image/png' || file.type === 'image/jpeg '){
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
    }else{
      alert("Please upload right format file")
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
          <img style={{width:200, height:200}} src={imgSrc} alt='...' accept='image/png, image/jpeg, image/jpg,image/gif'></img>
        </Form.Item>
        <Form.Item label="Button">
          <button type='submit' className='bg-blue-400 text-white p-2 rounded'>Add Film</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew
