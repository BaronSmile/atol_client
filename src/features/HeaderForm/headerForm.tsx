import React from 'react';
import './headerForm.css';
const HeaderForm = () => {
  return (
    <div className={'header_form'}>
      <h3 className="header_title">ДЕПАРТАМЕНТ УПРАВЛЕНИЯ ДАННЫМИ</h3>
      <img className={'atol_logo'} src="/assets/atol_logo.svg" alt="logo_atol" />
    </div>
  );
};

export default HeaderForm;
