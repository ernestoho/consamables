import React from 'react';

export default class OrderItemQuantity extends React.Component {
    render() {
        return (
            <div className="order-item-quantity">
                <input type="number" value={this.props.value} onChange={this.props.onChange}></input>
            </div>
        );
    }
}
