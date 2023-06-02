import { Form } from 'antd';
import React from 'react';
import './logComponent.css';
import TextArea from 'antd/es/input/TextArea';
const LogComponent = () => {
  return (
    <Form.Item className="log-item" label="Лог работы">
      <div className="log-item_block">Hello</div>
    </Form.Item>
  );
};

export default LogComponent;
