import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import promise from "redux-promise";
import reducers from './redux/reducers'
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import App from './App';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);

