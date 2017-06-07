import React from 'react';
import { Link } from 'react-router';

import s from './no-match.css';

export default class NoMatch extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1 className={s.heading}>404</h1>
      </div>
    );
  }
}
