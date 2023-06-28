import React, { useEffect, useState } from 'react';
import { Form, Progress } from 'antd';

import './Processing.css';
import FileUpload from '../../features/fileUpload/fileUpload';
import FormButton from '../../features/formButton/formButton';
import LogComponent from '../../features/logComponent/logComponent';
import Link from 'antd/es/typography/Link';

const Processing = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [taskId, setTaskId] = useState<undefined | number>();
  const [acceptedFile, setAcceptedFile] = useState(false);
  const [fileStatus, setFileStatus] = useState({
    file_url: null,
    log: [''],
    progress: '0',
    status: '',
  });
  const [previousSelectedFileUid, setPreviousSelectedFileUid] = useState<string | undefined>(
    undefined,
  );

  const baseURL: string = 'http://bigdata-kf.atol.ru:8081/api/v1/reports/cagent';

  const changeHandler = (file: any) => {
    if (!file.name) {
      setSelectedFile(null);
      setIsFilePicked(false);
      return;
    }

    if (fileStatus.status === 'done' && file.uid !== previousSelectedFileUid) {
      setAcceptedFile(false);
      setTaskId(undefined);
      setFileStatus({
        file_url: null,
        log: [''],
        progress: '0',
        status: '',
      });
    }

    if (/\.xlsx?$/.test(file.name) === false) {
      setSelectedFile(null);
      setIsFilePicked(false);
      return;
    }

    setSelectedFile(file);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    if (!selectedFile) {
      return;
    }
    setIsFilePicked(false);
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
        fetch(`${baseURL}/status/${taskId}`)
          .then((resp) => resp.json())
          .then((res) => {
            setFileStatus(res);
            if (['done', 'error'].includes(res.status)) {
              //if (res.status !== 'processing') { // FIXME: Uncomment after API fix
              console.log('Clearing interval', selectedFile);
              clearInterval(getInterval);
            }
          })
          .catch((err) => {
            console.error('GET_ERR:', err);
          });
      }, 1000);
    }
  }, [taskId]);

  return (
    <Form className={'process'} layout="vertical">
      <h3 className="form_title">Проверка контрагентов</h3>
      <FileUpload
        changeHandler={changeHandler}
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
