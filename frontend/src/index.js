import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom'
// axios.defaults.baseURL = "http://localhost:3030";
axios.defaults.baseURL = "https://dns-manager-jtsw.onrender.com";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <App />
</BrowserRouter>
   

);
