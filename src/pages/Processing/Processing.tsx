import React, { useEffect, useRef, useState } from 'react';
import { Anchor, Form, Progress } from 'antd';

import './Processing.css';
import UploadComponent from '../../features/fileUpload/fileUpload';
import FormButton from '../../features/formButton/formButton';
import LogComponent from '../../features/logComponent/logComponent';
import Link from 'antd/es/typography/Link';

const Processing = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileName, setFileName] = useState('Файл не выбран');
  const [taskId, setTaskId] = useState<undefined | number>();
  const [fileStatus, setFileStatus] = useState({
    file_url: null,
    log: ['Текст лога'],
    progress: '0',
    status: '',
    task_id: 123,
  });
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

    fetch('http://localhost:8081/api/v1/reports/upload', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log('POST_SUCCESS:', res);
        setTaskId(res.task_id);
      })
      .catch((err) => {
        console.error('POST_ERR:', err);
      });
  };
  const fetchData = () => {
    if (taskId) {
      fetch(`http://localhost:8081/api/v1/reports/cagent/status/${taskId}`)
        .then((resp) => {
          console.log('RESP:', resp);
          return resp.json();
        })
        .then((res) => {
          res = {
            task_id: 123,
            status: 'processing',
            progress: (Math.random() * 100).toFixed(2),
            log: res.log,
            file_url: 'http://localhost:8081/api/v1/reports/upload',
          };
          console.log('GET_SUCCESS', res);
          setFileStatus(res);
        })
        .catch((err) => {
          console.log('GET_ERR:', err);
        });
    }
  };

  useEffect(() => {
    const intervalID = setInterval(fetchData, 1000);
    if (fileStatus.progress > '75') {
      return () => clearInterval(intervalID);
    }
  }, [taskId]);

  return (
    <Form className={'process'} layout="vertical">
      <UploadComponent
        inputRef={inputRef}
        changeHandler={changeHandler}
        isFilePicked={isFilePicked}
        selectedFile={selectedFile}
        fileName={fileName}
      />
      <FormButton text={'Запустить проверку'} position={'center'} handleSubmit={handleSubmission} />

      <Progress percent={fileStatus ? +fileStatus?.progress : 0} />
      <LogComponent log={fileStatus.log} />

      {/*<FormButton handleSubmit={fileStatus.file_url} text={'Сохранить'} position={'right'} />*/}
      <Anchor>
        <Link disabled={!fileStatus.file_url} href={fileStatus.file_url ?? ''}>
          Сохранить
        </Link>
      </Anchor>
    </Form>
  );
};

export default Processing;
