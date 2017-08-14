import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { groupSelectors } from 'data/groups';

import { CloseButton, OrderItem } from 'common/components';

import './styles.scss';

const MyOrderPanel = ({ restaurantName, orderItems }) => (
  <div className="my-order-panel">
    <div className="order-details-header">
      <CloseButton />
      <div className="order-details-heading">
        Your Order from {restaurantName}
      </div>
    </div>
    <div className="order-items">
      {orderItems.map(orderItem => <OrderItem key={orderItem.orderItemId}{...orderItem} />)}
    </div>
  </div>
);

MyOrderPanel.propTypes = {
  restaurantName: PropTypes.string.isRequired,
  orderItems: PropTypes.arrayOf(PropTypes.shape({
    orderItemId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
};

const { getMyOrderItems, getMyOrderRestaurantName } = groupSelectors;

const mapStateToProps = (state, { id }) => ({
  orderItems: getMyOrderItems(state, id),
  restaurantName: getMyOrderRestaurantName(state, id),
});

export default connect(
  mapStateToProps,
)(toJS(MyOrderPanel));
