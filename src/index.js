// entry point for a react application to mount into the DOM

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider'; // provides auth context making auth data accessible to child components 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // tomamange routing in react app

ReactDOM.render(
  <React.StrictMode> {/** wraps the entire app for checks and warnings */}
    <BrowserRouter> {/*.. routing capabilities using HTML5 history API. Routing must be available to al the child components */}
    <AuthProvider>  {/* provides auth context to child components. It should be layered on top of all the routes*/}
      <Routes>    {/** container for all route components */}
      <Route path='/*' element={<App />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
document.getElementById('root')
);


