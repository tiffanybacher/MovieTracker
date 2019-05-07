import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';


const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

