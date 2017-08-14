import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { currentOrderActions } from 'data/currentOrder';

const PendingGroupToolbar = ({ id, hasVoted, onJoin, onStart }) => (
  <div className="toolbar">
    {!hasVoted ?
      <Link to={`/vote/${id}`} className="button" onClick={onJoin}>Join Queue</Link>
      : <div className="already-voted">Joined</div>}
    <Link to={`/activate/${id}`} className="button" onClick={onStart}>Start Order</Link>
  </div>
);

PendingGroupToolbar.propTypes = {
  id: PropTypes.number.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  onJoin: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
};

const { activateOrder } = currentOrderActions;

const mapDispatchToProps = (dispatch, { restaurantId, groupId }) => ({
  onJoin: () => {},
  onStart: () => dispatch(activateOrder(restaurantId, groupId)),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(PendingGroupToolbar);
