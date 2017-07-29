import '../../../styles/panels/my-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import CloseButton from '../CloseButton';
import OrderItem from '../OrderItem';
import { getGroupRestaurant } from '../../../selectors';

class MyOrderPanel extends React.Component {
  render() {
    const { restaurantName, orderItems } = this.props;

    return (
      <div className="my-order-panel">
        <div className="order-details-header">
          <CloseButton/>
          <div className="order-details-heading">
            Your Order from {restaurantName}
          </div>
        </div>
        <div className="order-items">
          {orderItems.map(orderItem =>
            <OrderItem key={orderItem.get('orderItemId')}{...orderItem.toObject()}/>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const order = state.myOrders.get(ownProps.id);
  return {
    orderItems: order ? order.get('orderItems') : List(),
    restaurantName: order ? getGroupRestaurant(state, order.get('groupId')) : null
  };
};

export default connect(
  mapStateToProps
)(MyOrderPanel);
