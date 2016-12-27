import React from 'react';
import { connect } from 'react-redux';

import OrderItemQuantity from './OrderItemQuantity';
import { getItemName, getItemPrice } from '../../../selectors';
import {
    removeItemFromOrder,
    incrementItem, decrementItem,
    setQuantity
} from '../../../actions';

class OrderItem extends React.Component {
    render() {
        const {
            name, quantity, price,
            onValueChange, onRemoveClick, onIncrementClick, onDecrementClick
        } = this.props;

        return (
            <div className="order-item">
                <div className="remove-item" onClick={onRemoveClick}>×</div>
                <div className="order-item-name">{name}</div>
                <OrderItemQuantity
                    value={quantity}
                    onChange={onValueChange}
                    onIncrementClick={onIncrementClick}
                    onDecrementClick={onDecrementClick}
                />
                <div className="order-item-price">
                    ${(price * quantity).toFixed(2)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    name: getItemName(state, ownProps.id),
    price: getItemPrice(state, ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onValueChange: event => dispatch(setQuantity(ownProps.id, Math.round(event.target.value))),
    onRemoveClick: () => dispatch(removeItemFromOrder(ownProps.id)),
    onIncrementClick: () => dispatch(incrementItem(ownProps.id)),
    onDecrementClick: () => dispatch(decrementItem(ownProps.id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderItem)
