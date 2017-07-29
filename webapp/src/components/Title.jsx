import '../styles/title.scss';

import React from 'react';

export default class Title extends React.Component {
  render() {
    return (
      <div className="title">
        <div className="heading">Consamables</div>
        <div className="subheading">Order food with your friends</div>
      </div>
    );
  }
}
