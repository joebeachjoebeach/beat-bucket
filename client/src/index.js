import React from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css';
import './index.css';

import App from './components/app';

import Sequencer from './sequencer';

// This makes sure the Tone AudioContext doesn't get prevented from starting up.
// More details here: https://github.com/Tonejs/Tone.js/issues/341
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running')
    Tone.context.resume();
});

// if we're in a dev environment and have the redux devtools, use them
let store;
if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
else
  store = createStore(reducers);

new Sequencer(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/share/:id" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('main')
);
registerServiceWorker();
