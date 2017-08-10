import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { currentUserSelectors } from 'data/currentUser';
import { currentOrderActions } from 'data/currentOrder';
import { suggestedOrderActions } from 'data/suggestedOrder';

const RestaurantToolbar = ({ id, open, loggedIn, onStartClick, onSuggestClick }) => {
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
  }
  return (
    <div className="toolbar">
      {menuButton}
    </div>
  );
};

RestaurantToolbar.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onSuggestClick: PropTypes.func.isRequired,
};

const { isCurrentUserLoggedIn } = currentUserSelectors;
const { startOrder } = currentOrderActions;
const { openSuggestOrder } = suggestedOrderActions;

const mapStateToProps = state => ({
  loggedIn: isCurrentUserLoggedIn(state),
});

const mapDispatchToProps = (dispatch, { restaurantId }) => ({
  onStartClick: () => dispatch(startOrder(restaurantId)),
  onSuggestClick: () => dispatch(openSuggestOrder(restaurantId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantToolbar);
