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
  const [fileName, setFileName] = useState('');
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
      setSelectedFile(null);
      setIsFilePicked(false);
      setFileName('Файл не выбран');
      return;
    }

    if (/\.xlsx?$/.test(inputRef.current.files[0].name) === false) {
      setSelectedFile(null);
      setIsFilePicked(false);
      setFileName('Поддерживается только загрузка xlsx-файлов');
      return;
    }

    setSelectedFile(file);
    setIsFilePicked(true);
    setFileName(file.name);
  };

  const handleSubmission = () => {
    if(!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:8081/api/v1/reports/upload', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((res) => {
        setTaskId(res.task_id);
      })
      .catch((err) => {
        console.error('POST_ERR:', err);
      });
  };

  useEffect(() => {
    if (taskId) {
      const getInterval = setInterval(() => {
        console.log('INT');

        fetch(`http://localhost:8081/api/v1/reports/cagent/status/${taskId}`)
          .then((resp) => resp.json())
          .then((res) => {

            // PGRS = PGRS || 0;
            // PGRS += (Math.random() * 10);
            // PGRS = Number(Math.min(PGRS, 100));
            
            // res = {
            //   task_id: taskId,
            //   status: PGRS < 100 ? 'processing' : 'success',
            //   progress: PGRS.toFixed(2),
            //   log: res.log,
            //   file_url: PGRS >= 100 ? 'http://localhost:8081/api/v1/reports/upload' : null,
            // };

            setFileStatus(res);

            //if (res.status !== 'processing') { // FIXME: Uncomment after API fix
            if (res.status == 'success' || res.status == 'error') {
              console.log('Clearing interval', res);
              clearInterval(getInterval);
            }
          })
          .catch((err) => {
            console.log('GET_ERR:', err);
          });
      }, 1000);
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
      <FormButton text={'Запустить проверку'} disabled={!isFilePicked} position={'center'} handleSubmit={handleSubmission} />
      <Progress percent={fileStatus ? +fileStatus?.progress : 0} />
      <LogComponent log={fileStatus.log} />
      <Link disabled={!fileStatus.file_url} target="_blank" href={fileStatus.file_url ?? ''}>
        Сохранить
      </Link>
    </Form>
  );
};

export default Processing;
