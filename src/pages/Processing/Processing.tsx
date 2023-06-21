import React, { useEffect, useRef, useState } from 'react';
import { Form, Progress } from 'antd';

import './Processing.css';
import FileUpload from '../../features/fileUpload/fileUpload';
import FormButton from '../../features/formButton/formButton';
import LogComponent from '../../features/logComponent/logComponent';
import Link from 'antd/es/typography/Link';

const Processing = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileName, setFileName] = useState('');
  const [taskId, setTaskId] = useState<undefined | number>();
  const [acceptedFile, setAcceptedFile] = useState(false);
  const [fileStatus, setFileStatus] = useState({
    file_url: null,
    log: [''],
    progress: '0',
    status: '',
    task_id: 123,
  });
  const [previousSelectedFileUid, setPreviousSelectedFileUid] = useState<string | undefined>(
    undefined,
  );

  const inputRef = useRef<any>();
  // let PGRS = localStorage.PGRS;
  // let allLogs: string[] = [];
  const baseURL: string = 'http://localhost:8081/api/v1/reports'; //'http://10.177.118.18:8081/api/v1/reports'; // 'http://localhost:8081/api/v1/reports'

  const changeHandler = (file: any) => {
    // const file = inputRef.current.files[0];
    // console.log('FILE_INFO:', file);
    // console.log('FILE_STATUS:', fileStatus);
    if (!file.name) {
      setSelectedFile(null);
      setIsFilePicked(false);
      setFileName('Файл не выбран');
      return;
    }

    if (fileStatus.status === 'done' && file.uid !== previousSelectedFileUid) {
      setAcceptedFile(false);
      setTaskId(undefined);
      console.log('HOPE:');
      setFileStatus({
        file_url: null,
        log: [''],
        progress: '0',
        status: '',
        task_id: 123,
      });
    }

    // if (/\.xlsx?$/.test(inputRef.current.files[0].name) === false) {
    if (/\.xlsx?$/.test(file.name) === false) {
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
    // console.log('HANDLE:', selectedFile);
    // console.log('HANDLE2:', previousSelectedFileUid);
    if (!selectedFile) {
      return;
    }

    setPreviousSelectedFileUid(selectedFile?.uid);

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch(`${baseURL}/upload`, {
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
      setAcceptedFile(true);
      const getInterval = setInterval(() => {
        // console.log('INT');

        fetch(`${baseURL}/cagent/status/${taskId}`)
          .then((resp) => resp.json())
          .then((res) => {
            // PGRS = PGRS || 0;
            // PGRS += Math.random() * 10;
            // PGRS = Number(Math.min(PGRS, 100));
            // allLogs.push(...res.log);
            // res = {
            //   task_id: taskId,
            //   status: PGRS < 100 ? 'processing' : 'done',
            //   progress: PGRS.toFixed(2),
            //   log: allLogs,
            //   file_url: PGRS >= 100 ? `${baseURL}/get-file` : null,
            // };

            setFileStatus(res);

            if (['done', 'error'].includes(res.status)) {
              //if (res.status !== 'processing') { // FIXME: Uncomment after API fix
              console.log('Clearing interval', selectedFile);
              clearInterval(getInterval);
              // if (selectedFile.uid !== previousSelectedFileUid) {
              //   setFileStatus({
              //     file_url: null,
              //     log: [''],
              //     progress: '0',
              //     status: '',
              //     task_id: 123,
              //   });
              // }
            }
          })
          .catch((err) => {
            console.error('GET_ERR:', err);
          });
      }, 1000);
    }
  }, [taskId]);

  // console.log('RENDER:', fileStatus.log);

  return (
    <Form className={'process'} layout="vertical">
      <h3 className="form_title">Проверка контрагентов</h3>
      <FileUpload
        inputRef={inputRef}
        changeHandler={changeHandler}
        isFilePicked={isFilePicked}
        selectedFile={selectedFile}
        fileName={fileName}
        acceptedFile={acceptedFile}
        fileStatus={fileStatus.status}
      />
      <FormButton
        text={'Запустить проверку'}
        disabled={!isFilePicked}
        position={'center'}
        handleSubmit={handleSubmission}
      />
      <Progress percent={fileStatus ? +fileStatus?.progress : 0} />
      <LogComponent log={fileStatus.log} />
      <Link disabled={!(fileStatus.status === 'done')} target="_blank" href={`${baseURL}/get-file`}>
        Сохранить
      </Link>
    </Form>
  );
};

export default Processing;
