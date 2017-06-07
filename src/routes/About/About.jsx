import React from 'react';
import { Link } from 'react-router-dom';

import s from './about.css';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1 className={s.heading}>About me</h1>
      </div>
    );
  }
}
