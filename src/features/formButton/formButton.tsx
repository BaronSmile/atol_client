import React from 'react';
import { Button, Form } from 'antd';
import './formButton.css';

interface FormBtnProps {
  text: string;
  position: 'left' | 'center' | 'right';
  handleSubmit?: any;
}
const FormButton: React.FC<FormBtnProps> = ({ text, position = 'center', handleSubmit }) => {
  return (
    <Form.Item className={`form-btn btn_${position}`}>
      <Button type={'primary'} className={'btn'} onClick={handleSubmit}>
        {text}
      </Button>
    </Form.Item>
  );
};

export default FormButton;
