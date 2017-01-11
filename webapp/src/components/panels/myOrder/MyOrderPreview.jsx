import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class MyOrderPreview extends React.Component {
    render() {
        const {
            id, restaurantName, orderItems,
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
                <Link to={`/order-details/${id}`} className="button">View Details</Link>
            </div>
        );
    }
}
