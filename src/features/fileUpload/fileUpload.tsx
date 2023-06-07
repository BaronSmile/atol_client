import React from 'react';
import { Button, Upload } from 'antd';
import './fileUpload.css';
import { CheckOutlined } from '@ant-design/icons';

interface FileUploadProps {
  inputRef?: any;
  changeHandler: any;
  isFilePicked?: any;
  selectedFile?: any;
  fileName?: string;
  acceptedFile: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  changeHandler,
  inputRef,
  isFilePicked,
  selectedFile,
  fileName,
  acceptedFile,
}) => {
  return (
    <div className="file-input-container">
      {/*<label htmlFor="file-input">Выберите файл:</label>*/}
      {/*<Button className="file-name">Загрузить</Button>*/}
      {/*<input type="file" name="file" onChange={changeHandler} ref={inputRef} />*/}

      {/*{isFilePicked ? (*/}
      {/*  <div className={'upload_file'}>*/}
      {/*    <p>{selectedFile.name}</p>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <p style={{ width: '100%' }}>{fileName}</p>*/}
      {/*)}*/}

      <Upload
        listType="text"
        accept=".xlsx,.xls"
        beforeUpload={(file) => {
          console.log(file);
          return changeHandler(file);
        }}
        itemRender={(exisingComp, file) => {
          return (
            <div className={'upload_file'}>
              {acceptedFile ? (
                <CheckOutlined style={{ paddingRight: '10px', color: 'green' }} />
              ) : null}
              <p>{file.name}</p>
            </div>
          );
        }}
      >
        <label className="file-input">Обрабатываемый документ:</label>
        <Button className="uploadBtn">Загрузить</Button>
      </Upload>
    </div>
  );
};

export default FileUpload;
