import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
// const image = require('./images/home.jpg');


import s from './home.scss';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" /* style={{ backgroundImage: `url(${image})` }}*/>
        <h1 key="headin" className={s.heading}>Home</h1>
        <div className="home_navigation">
          <Link to="/"><button>Projects</button></Link>
          <Link to="/"><button>About</button></Link>
        </div>
      </div>
    );
  }
}
