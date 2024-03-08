import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AdminRouter,WebRouter } from './router/index';
import { AuthProvider } from "./contexts"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AdminRouter />
          <WebRouter />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
