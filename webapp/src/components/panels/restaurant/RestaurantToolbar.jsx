import React from 'react';
import { Link } from 'react-router';

export default class RestaurantToolbar extends React.Component {
  render() {
    const {
      id, loggedIn, open,
      onStartClick, onSuggestClick
    } = this.props;

    const menuButton = (
      <Link to={`/menu/${id}`} className="button">View Menu</Link>
    );

    if (loggedIn && open) {
      return (
        <div className="toolbar">
          {menuButton}
          <Link to={`/start/${id}`} className="button" onClick={onStartClick}>
            Start Order
          </Link>
          <Link to={`/suggest/${id}`} className="button" onClick={onSuggestClick}>
            Suggest Order
          </Link>
        </div>
      );
    } else {
      return (
        <div className="toolbar">
          {menuButton}
        </div>
      );
    }
  }
}
