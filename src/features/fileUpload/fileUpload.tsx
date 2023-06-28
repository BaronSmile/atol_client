import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import './fileUpload.css';
import { CheckOutlined } from '@ant-design/icons';

interface FileUploadProps {
  changeHandler: any;
  acceptedFile: boolean;
  fileStatus?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ changeHandler, acceptedFile, fileStatus }) => {
  const [lastUploadedFile, setLastUploadedFile] = useState<any>(null);
  const handleChange = (file: any) => {
    setLastUploadedFile(file);
    return changeHandler(file);
  };

  const renderItem = (existingNode: any, file: any) => {
    const isLastUploadedFile = lastUploadedFile && lastUploadedFile.uid === file.uid;

    return (
      <div className={'upload_file'} style={{ display: `${isLastUploadedFile ? 'flex' : 'none'}` }}>
        {isLastUploadedFile && acceptedFile ? (
          <CheckOutlined style={{ paddingRight: '10px', color: 'green' }} />
        ) : null}
        <p>{isLastUploadedFile ? lastUploadedFile.name : null}</p>
      </div>
    );
  };

  return (
    <div className="file-input-container">
      <Upload
        className={'upload_form_item'}
        listType="text"
        accept=".xlsx,.xls"
        beforeUpload={handleChange}
        itemRender={renderItem}
      >
        <label className="file-input">Обрабатываемый документ:</label>
        <Button disabled={fileStatus === 'processing'} className="uploadBtn">
          Обзор...
        </Button>
      </Upload>
    </div>
  );
};

export default FileUpload;
