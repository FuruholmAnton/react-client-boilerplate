import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
// const image = require('./images/home.jpg');


import s from './home.css';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

	componentWillUnmount() {

  }

  render() {
    return (
      <div className="container" /* style={{ backgroundImage: `url(${image})` }}*/>
        <h1 className={s.heading}>Home</h1>
        <div className="home_navigation">

        </div>
      </div>
    );
  }
}
