import Home from './Home/Home';
import About from './About/About';
import NoMatch from './NoMatch/NoMatch';

export default {
	home: {
		path: '/',
		exact: true,
		component: Home,
	},
	about: {
		path: '/about',
		component: About,
	},
	noMatch: {
		component: NoMatch,
	}
};
