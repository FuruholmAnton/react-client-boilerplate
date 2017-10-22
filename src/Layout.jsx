import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
	Link,
	NavLink,
} from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import PageTransition from './PageTransition';

import { onRouteChange } from './core/functions';
import { entries } from 'Utils';

import { Header } from 'Components';
import routes from 'Routes';

export default class Layout extends React.Component {

	constructor (props) {
		super(props);

		this.props.updateHistory([
			{
				pathname: window.location.pathname,
			}
		]);
		this.historyUnlisten = this.props.history.listen((location, action) => {
			// location is an object like window.location
			let currentHistory = this.props.appData().history;
			if (currentHistory.length && currentHistory[currentHistory.length - 1].pathname == location.pathname) return;

			switch (action.toLowerCase()) {
				case 'push':
					currentHistory.push(location)
					break;
				case 'pop':
					currentHistory = currentHistory.slice(0, currentHistory.length - 1)
					break;

				default:
					break;
			}

			this.props.updateHistory(currentHistory);
		})

		this.routesArr = Object.entries(routes);

		document.addEventListener('online',  e => this.updateConnectionStatus(e), false );
		document.addEventListener('offline', e => this.updateConnectionStatus(e), false );
		this.updateConnectionStatus();
	}

	render() {

		return [

			<Header key="header-main" />,

			<Route key="route-main" render={({location, history}) => {

				const navItems = [];
				for (let [key, route] of entries(routes)) {
					if ('path' in route && route.path.split('/').length <= 2) {
						navItems.push((
							<Route
								key={route.path}
								exact={route.exact}
								path={route.path}
								render={(params) => <route.component {...this.props} {...params}></route.component>} />
						));
					}
				}

				navItems.push(
					<Redirect key="wildcard" push to={{ pathname: '/' }}/>
				)

				return (
					<TransitionGroup className="page-container">
						<PageTransition appData={this.props.appData} key={location.pathname} path={location.pathname}>
							<Switch location={location}>
								{navItems}
							</Switch>
						</PageTransition>
					</TransitionGroup>
				)
			}} />,
		];
	}

	// CUSTOM

	updateConnectionStatus(e) {
		this.props.updateConnectionStatus({
			connectionStatus: navigator.onLine
		})
	}
}
