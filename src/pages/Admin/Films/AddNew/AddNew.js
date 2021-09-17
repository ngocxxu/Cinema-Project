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

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
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
          <Input name='tenPhim'/>
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name='trailer'/>
        </Form.Item>
        <Form.Item label="Description">
          <Input name='moTa'/>
        </Form.Item>
        <Form.Item label="Showing Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Now Showing" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Coming Soon">
          <Switch />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch />
        </Form.Item>
        <Form.Item label="Star Rating">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Picture">
          <input type='file' />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew
