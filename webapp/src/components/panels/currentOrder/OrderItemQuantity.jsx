import React from 'react';
import PropTypes from 'prop-types';

const OrderItemQuantity = ({ value, onChange, onIncrement, onDecrement }) => (
  <div className="order-item-quantity">
    {value > 1 ?
      <div className="order-item-decrement" onClick={onDecrement}>-</div>
      : null}
    <input type="number" value={value} onChange={onChange} />
    <div className="order-item-increment" onClick={onIncrement}>+</div>
  </div>
);

OrderItemQuantity.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default OrderItemQuantity;
