import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css';
import './index.css';

import App from './components/app';

import Sequencer from './sequencer';

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
