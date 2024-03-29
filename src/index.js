import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store, { persistor } from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root-app')
);

serviceWorker.unregister();
