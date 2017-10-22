import React from 'react';
import {
	Link,
	NavLink,
} from 'react-router-dom';

import s from './header.scss';

export default class Header extends React.Component {
	constructor(props) {
		super(props);


	}

	componentDidMount() {
		this.props.updateHeaderHeight(this.header.offsetHeight);

		window.addEventListener('resize', () => {
			const height = this.header.offsetHeight;
			this.props.updateHeaderHeight(height);
		});
	}

	render() {
		console.log(this.props.appData());
		return (
			<header className={s.header} ref={(el) => {this.header = el} }>
				<nav className={s.nav}>
					{/* TODO: Loop through routes.js */}
					<NavLink to="/" className={s.item}>Home</NavLink>
					<NavLink to="/about" className={s.item}>About</NavLink>
					<NavLink to="/404" className={s.item}>404</NavLink>
				</nav>
			</header>
		);
	}

}
