import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { currentUserSelectors } from 'data/currentUser';
import { restaurantSelectors } from 'data/restaurants';
import { currentOrderActions } from 'data/currentOrder';

import { OrderTimer } from 'common/components';

function ActiveGroupBox({
  groupId, loggedIn, restaurantName, type, orders,
  timeStarted, durationMinutes,
  joinOrder,
}) {
  return (
    <div className="active-group-box">
      <div className="box-title">{restaurantName}</div>
      <div className="info order-type">{_.startCase(type)}</div>
      <div className="info">{orders} {orders > 1 ? 'people' : 'person'} in group</div>
      <OrderTimer timeStarted={timeStarted} duration={durationMinutes} />
      {loggedIn ?
        <div className="toolbar">
          <Link to={`/join/${groupId}`} className="button" onClick={joinOrder}>Join Order</Link>
        </div>
        : null}
    </div>
  );
}

ActiveGroupBox.propTypes = {
  groupId: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  restaurantName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  orders: PropTypes.number.isRequired,
  timeStarted: PropTypes.number.isRequired,
  durationMinutes: PropTypes.number.isRequired,
  joinOrder: PropTypes.func.isRequired,
};

const { isCurrentUserLoggedIn } = currentUserSelectors;
const { getRestaurantName } = restaurantSelectors;
const { joinOrder } = currentOrderActions;

const mapStateToProps = (state, { restaurantId }) => ({
  loggedIn: isCurrentUserLoggedIn(state),
  restaurantName: getRestaurantName(state, restaurantId),
});

const mapDispatchToProps = (dispatch, { restaurantId, groupId }) => ({
  joinOrder: () => dispatch(joinOrder(restaurantId, groupId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveGroupBox);
