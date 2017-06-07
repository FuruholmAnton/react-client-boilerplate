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
import { Home, About, NoMatch } from 'Routes';

export default class AppRoutes extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Header />

					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/about" component={About}/>
						<Route component={NoMatch}/>
					</Switch>
				</div>
			</Router>
		);
	}
}
