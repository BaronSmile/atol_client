import React from 'react';
import { Form } from 'antd';

import './Processing.css';
import UploadComponent from '../../features/fileUpload/fileUpload';
import FormButton from '../../features/formButton/formButton';
import LogComponent from '../../features/logComponent/logComponent';

const Processing = () => {
  return (
    <Form className={'process'} layout="vertical">
      <UploadComponent />
      <LogComponent />
      <FormButton text={'Сохранить'} position={'right'} />
    </Form>
  );
};

export default Processing;
