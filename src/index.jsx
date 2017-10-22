import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import gsap from 'gsap';

/* Global Styles */
import '../styles/index.sass';

/* HMR */
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import store from 'Redux/store';

/* Service Worker */
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body);


ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<App />
		</AppContainer>
  	</Provider>,
	document.getElementById('app')
);

// Hot Module Replacement API
// Only for development
if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default;
		ReactDOM.render(
			<Provider store={store}>
				<AppContainer>
					<NextApp/>
				</AppContainer>
			</Provider>,
			document.getElementById('app')
		);
	});
}
