import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";   // <-- ADD THIS
import { store } from "./store/storeconfiguration";  // <-- ADD THIS
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>       {/* <-- WRAP APP WITH PROVIDER */}
      <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        pauseOnHover
        theme="colored"
      />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
