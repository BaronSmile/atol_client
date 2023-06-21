import React from 'react';
import Processing from '../pages/Processing/Processing';
import './App.css';
import HeaderForm from '../features/HeaderForm/headerForm';

const App = () => {
  return (
    <div className={'app'}>
      <HeaderForm />
      <Processing />
    </div>
  );
};

export default App;
