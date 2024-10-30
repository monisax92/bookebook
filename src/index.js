import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {ToastContainer, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { ScrollToTop } from './components';
import { CartProvider, FilterProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FilterProvider>
        <CartProvider>
          <ScrollToTop />
          <ToastContainer position="bottom-right" toastClassName="bg-gray-200 dark:bg-gray-900" transition={Zoom}/>
          <App />
        </CartProvider>
      </FilterProvider>
    </BrowserRouter>
  </React.StrictMode>
);

