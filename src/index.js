import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import App from './containers/App/App';
import './styles/index.scss';

const store = createStore(rootReducer, composeWithDevTools());
const provider = 
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

ReactDOM.render(provider, document.getElementById("root"));
