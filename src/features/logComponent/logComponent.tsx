import { Form } from 'antd';
import React from 'react';
import './logComponent.css';

interface LogProps {
  log: string[];
}

const LogComponent: React.FC<LogProps> = ({ log }) => {
  return (
    <Form.Item className="log-item" label="Сообщения о работе">
      <ul className="log-item_block">
        {log.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </Form.Item>
  );
};

export default LogComponent;
