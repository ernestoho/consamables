import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentUserSelectors } from 'data/currentUser';

import { OrderItem } from 'common/components';

const IndividualOrder = ({ username, isCurrentUser, orderItems }) => (
  <div className="individual-order">
    <div className="username">
      {username.split('@')[0]}<wbr />{`@${username.split('@')[1]}`}
      {isCurrentUser ? ' (you)' : null}
    </div>
    <div className="order-items">
      {orderItems.map(orderItem => <OrderItem key={orderItem.orderItemId}{...orderItem} />)}
    </div>
  </div>
);

IndividualOrder.propTypes = {
  username: PropTypes.string.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  orderItems: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
};

const { getCurrentUsername } = currentUserSelectors;

const mapStateToProps = (state, { username }) => ({
  isCurrentUser: getCurrentUsername(state) === username,
});

export default connect(
  mapStateToProps,
)(IndividualOrder);
