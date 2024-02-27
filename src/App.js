import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AdminRouter,WebRouter } from './router/index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminRouter />
        <WebRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
