import React from 'react';

import OrderTimer from '../OrderTimer';

class ActiveOrderBox extends React.Component {
    render() {
        const { restaurantName, timeStarted, duration } = this.props;

        return (
            <div className="active-order-box">
                <div className="box-title">{restaurantName}</div>
                <OrderTimer timeStarted={timeStarted} duration={duration}/>
                <div className="toolbar">
                    <button className="button">Join Order</button>
                </div>
            </div>
        );
    }
}