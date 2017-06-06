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

import Home from './components/Home';
import About from './components/About';
import NoMatch from './components/NoMatch';

export default class AppRoutes extends React.Component {
	render() {
		return (
		<Router>
			<div>
				<ul>
					<li><NavLink to="/">Home</NavLink></li>
					<li><NavLink to="/about">About</NavLink></li>
				</ul>

				<hr/>
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
