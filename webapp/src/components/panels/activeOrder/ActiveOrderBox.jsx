import React from 'react';

import OrderTimer from '../OrderTimer';

class ActiveOrderBox extends React.Component {
    render() {
        return (
            <div className="active-order-box">
                <div className="box-title">{this.props.restaurantName}</div>
                <OrderTimer {...this.props}></OrderTimer>
                <div className="toolbar">
                    <button className="button">Join Order</button>
                </div>
            </div>
        );
    }
}