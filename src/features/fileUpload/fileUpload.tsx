import React, { useRef, useState, ChangeEvent } from 'react';
import { Button, Form } from 'antd';
import './fileUpload.css';
import FormButton from '../formButton/formButton';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileName, setFileName] = useState('Файл не выбран');
  const inputRef = useRef<any>();
  const changeHandler = () => {
    const file = inputRef.current.files[0];

    if (!inputRef.current?.files?.[0]?.name) {
      return;
    }

    if (/\.xlsx?$/.test(inputRef.current.files[0].name) === false) {
      setFileName('Поддерживается только загрузка xlsx-файлов');
      return;
    }

    setSelectedFile(file);
    setIsFilePicked(true);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Файл не выбран');
    }
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    console.log('DOC:', selectedFile);

    fetch('http://localhost:8081/api/v1/reports/upload', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log('SUCCESS:', res);
      })
      .catch((err) => {
        console.error('ERR:', err);
      });
  };

  return (
    <div className="file-input-container">
      <label htmlFor="file-input">Выберите файл:</label>
      <Button className="file-name">Загрузить</Button>
      <input type="file" name="file" onChange={changeHandler} ref={inputRef} />
      {isFilePicked ? (
        <div className={'upload_file'}>
          <p>{selectedFile.name}</p>
        </div>
      ) : (
        <p style={{ width: '100%' }}>{fileName}</p>
      )}

      <FormButton text={'Запустить проверку'} position={'center'} handleSubmit={handleSubmission} />
    </div>
  );
};

export default FileUpload;
