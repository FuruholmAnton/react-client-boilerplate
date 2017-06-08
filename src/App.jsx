import {
  BrowserRouter as Router,
  Route,
	Switch,
  Link,
	NavLink,
} from 'react-router-dom';
import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { onRouteChange } from './core/functions';

import Layout from './Layout';


export default () => {
	return (
		<Router>
			<Layout />
		</Router>
	)
};
