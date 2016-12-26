import React from 'react';

export default class OrderItemQuantity extends React.Component {
    render() {
        return (
            <div className="order-item-quantity">
                {this.props.value > 1 ?
                    <div
                        className="order-item-decrement"
                        onClick={this.props.onDecrementClick}
                    >
                        -
                    </div>
                : null}
                <input type="number" value={this.props.value} onChange={this.props.onChange}></input>
                <div
                    className="order-item-increment"
                    onClick={this.props.onIncrementClick}
                >
                    +
                </div>
            </div>
        );
    }
}
