import React from 'react';

export default class OrderItemQuantity extends React.Component {
  render() {
    const {
      value,
      onChange, onIncrementClick, onDecrementClick
    } = this.props;

    return (
      <div className="order-item-quantity">
        {value > 1 ?
          <div
            className="order-item-decrement"
            onClick={onDecrementClick}
          >
            -
          </div>
          : null}
        <input type="number" value={value} onChange={onChange}></input>
        <div
          className="order-item-increment"
          onClick={onIncrementClick}
        >
          +
        </div>
      </div>
    );
  }
}
