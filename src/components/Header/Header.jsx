import React from 'react';
import {
  Link,
	NavLink,
} from 'react-router-dom';

import s from './header.scss';

export default class NoMatch extends React.Component {
  render() {
    return (
      <header  className={s.header}>
				<nav className={s.nav}>
					<NavLink to="/" className={s.item}>Home</NavLink>
					<NavLink to="/about" className={s.item}>About</NavLink>
				</nav>
			</header>
    );
  }
}
