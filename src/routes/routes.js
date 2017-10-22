import Home from './Home/Home';
import About from './About/About';
import NoMatch from './NoMatch/NoMatch';

export default {
	home: {
		path: '/',
		exact: true,
		component: Home,
		depth: 0,
	},
	about: {
		path: '/about',
		component: About,
		depth: 0,
	},
	noMatch: {
		path: '*',
		component: NoMatch,
		depth: 0,
	}
};
