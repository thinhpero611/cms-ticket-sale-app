import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// router
import { BrowserRouter as Router} from 'react-router-dom'
// store redux
import { store } from './app/store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

ReactDOM.render(
  <Router>
    <Provider store={store}>
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);

