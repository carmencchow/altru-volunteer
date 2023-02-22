import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import rootReducer from './redux/reducers'
import thunk from "redux-thunk";

const storeWithMiddleware = applyMiddleware(thunk, promise)(createStore);
const store = storeWithMiddleware(rootReducer, {})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();