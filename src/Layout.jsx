import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	NavLink,
} from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { onRouteChange } from './core/functions';

import { Header } from 'Components';
// import { Home, About, NoMatch } from 'Routes';
import routes from 'Routes';

export default class Index extends React.Component {

	render() {
		/* Gets the last pathname */
		let page = location.pathname.split('/').filter(n => n.length).pop() || 'home';
		console.log('Location:', page);
		let routesArr = Object.entries(routes);
		console.log(routesArr);

		return (
			<div className="full">

				<Header />

				<Route render={({ location }) => {
					console.log(location);
					let value = routesArr.find((n) => n[1].path == location.pathname);
					value = value ? value[1] : false;

					return (
						<div className="content">
							{(value) ? (
								<CSSTransitionGroup
									component="div"
									className="page-transition"
									transitionName="pageSwap"
									transitionEnterTimeout={1000}
									transitionLeaveTimeout={1000}>
									<Route
										exact={value.exact}
										path={value.path}
										location={location}
										key={location.key}
										component={value.component} />
								</CSSTransitionGroup>
							) : (
									<CSSTransitionGroup
										component="div"
										className="page-transition"
										transitionName="pageFade"
										transitionEnterTimeout={1000}
										transitionLeaveTimeout={1000}>
										<Route component={routes.noMatch.component} />
									</CSSTransitionGroup>
								)
							}
						</div>
					)
				}} />

			</div>
		);
	}
}
