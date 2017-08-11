import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatOrderItemData } from 'common/utils';

import { itemSelectors } from 'data/items';
import { currentOrderActions } from 'data/currentOrder';

import OrderItemQuantity from './OrderItemQuantity';

function OrderItem({
  name, quantity, price, data,
  onValueChange, onRemove, onIncrement, onDecrement,
}) {
  return (
    <div className="order-item">
      <div className="remove-item" onClick={onRemove}>×</div>
      <div className="order-item-description">
        <div className="order-item-name">{name}</div>
        {data ?
          <div className="order-item-data">
            {formatOrderItemData(data)}
          </div>
          : null}
      </div>
      <OrderItemQuantity
        value={quantity}
        onChange={onValueChange}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      <div className="order-item-price">
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  );
}

OrderItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onValueChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

OrderItem.defaultProps = { data: null };

const { getItemName, getItemPrice } = itemSelectors;
const { removeItemFromOrder, incrementItem, decrementItem, setQuantity } = currentOrderActions;

const mapStateToProps = (state, { id }) => ({
  name: getItemName(state, id),
  price: getItemPrice(state, id),
});

const mapDispatchToProps = (dispatch, { index }) => ({
  onValueChange: event => dispatch(setQuantity(index, Math.round(event.target.value))),
  onRemove: () => dispatch(removeItemFromOrder(index)),
  onIncrement: () => dispatch(incrementItem(index)),
  onDecrement: () => dispatch(decrementItem(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderItem);
