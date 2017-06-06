import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/index.sass';

import { AppContainer } from 'react-hot-loader';
import App from './App';



ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}

/*const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}*/
