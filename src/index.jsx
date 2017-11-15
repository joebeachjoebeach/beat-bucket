import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import 'normalize.css';
import './index.css';

import App from './components/app';

import Sequencer from './sequencer';

const store = createStore(reducers);

const sequencer = new Sequencer(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('main')
);
