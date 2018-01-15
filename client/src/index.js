import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';

import 'normalize.css';
import './index.css';

import App from './components/app';

import Sequencer from './sequencer';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const sequencer = new Sequencer(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('main')
);
