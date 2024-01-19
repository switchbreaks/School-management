import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
  document.getElementById('root')
);