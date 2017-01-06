import React from 'react';
import { connect } from 'react-redux';

export default class MyOrderPreview extends React.Component {
    render() {
        const {
            restaurantName, orderItems,
            onClick
        } = this.props;
        return (
            <div className="my-order-preview">
                <div className="info">
                    <div className="restaurant-name">{restaurantName}</div>
                    <div className="num-items">
                        {orderItems.size} item{orderItems.size > 1 ? 's' : null}
                    </div>
                </div>
                <button className="button" onClick={onClick}>View Details</button>
            </div>
        );
    }
}
