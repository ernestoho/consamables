import React from 'react';
import { connect } from 'react-redux';

import OrderItemQuantity from './OrderItemQuantity';
import { getItemName, getItemPrice } from '../../../selectors';
import {
    removeItemFromOrder,
    incrementItem, decrementItem,
    setQuantity
} from '../../../actions';
import { formatOrderItemData } from '../../../helpers';

class OrderItem extends React.Component {
    render() {
        const {
            name, quantity, price, data,
            onValueChange, onRemoveClick, onIncrementClick, onDecrementClick
        } = this.props;

        return (
            <div className="order-item">
                <div className="remove-item" onClick={onRemoveClick}>×</div>
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
    onValueChange: event => dispatch(setQuantity(ownProps.index, Math.round(event.target.value))),
    onRemoveClick: () => dispatch(removeItemFromOrder(ownProps.index)),
    onIncrementClick: () => dispatch(incrementItem(ownProps.index)),
    onDecrementClick: () => dispatch(decrementItem(ownProps.index))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderItem)
