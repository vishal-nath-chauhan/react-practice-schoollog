import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Route } from 'react-router-dom'
import store from "./Data/Store"
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <Route>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Route>
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
