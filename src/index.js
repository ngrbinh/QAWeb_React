import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './redux/configureStore'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root-app')
);

serviceWorker.unregister();
