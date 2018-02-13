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

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const sequencer = new Sequencer(store);

window.sequencer = sequencer;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={App} />
        <Route path={process.env.PUBLIC_URL + '/share/:id'} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('main')
);
registerServiceWorker();
