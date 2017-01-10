import '../../../styles/panels/my-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
    const orderId = state.centerColumn.myOrderDetails.get('orderId');
    const order = state.myOrders.get(orderId);
    return {
        orderItems: order.get('orderItems'),
        restaurantName: getGroupRestaurant(state, order.get('groupId'))
    };
};

export default connect(
    mapStateToProps
)(MyOrderPanel)
