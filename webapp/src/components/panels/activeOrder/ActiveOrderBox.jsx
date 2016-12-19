import React from 'react';

import OrderTimer from '../OrderTimer';

class ActiveOrderBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: `Restaurant ${props.restaurantId}`
        };
    }

    componentDidMount() {
        fetch('/api/restaurants/' + this.props.restaurantId).then(response => {
            response.json().then(json => {
                this.setState({ restaurantName: json.name });
            });
        });
    }

    render() {
        return (
            <div className="active-order-box">
                <div className="box-title">{this.state.restaurantName}</div>
                <OrderTimer {...this.props}></OrderTimer>
                <div className="toolbar">
                    <button className="button">Join Order</button>
                </div>
            </div>
        );
    }
}