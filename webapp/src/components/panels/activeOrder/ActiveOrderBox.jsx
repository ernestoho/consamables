import React from 'react';

import OrderTimer from '../OrderTimer';

export default class ActiveOrderBox extends React.Component {
    render() {
        const { restaurantName, timeStarted, durationMinutes } = this.props;

        return (
            <div className="active-order-box">
                <div className="box-title">{restaurantName}</div>
                <OrderTimer timeStarted={timeStarted} duration={durationMinutes}/>
                <div className="toolbar">
                    <button className="button">Join Order</button>
                </div>
            </div>
        );
    }
}
