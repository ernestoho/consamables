import React from 'react';

import OrderItem from './OrderItem';

export default class IndividualOrder extends React.Component {
    render() {
        const { username, orderItems } = this.props;
        return (
            <div className="individual-order">
                <div className="username">
                    {username.split('@')[0]}<wbr/>{'@' + username.split('@')[1]}
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
