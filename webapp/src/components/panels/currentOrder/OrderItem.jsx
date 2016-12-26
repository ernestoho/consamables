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
        return (
            <div className="order-item">
                <div className="remove-item" onClick={this.props.onRemoveClick}>×</div>
                <div className="order-item-name">{this.props.name}</div>
                <OrderItemQuantity
                    value={this.props.quantity}
                    onChange={this.props.onValueChange}
                />
                <div className="order-item-price">
                    ${(this.props.price * this.props.quantity).toFixed(2)}
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
    onValueChange: event => dispatch(setQuantity(ownProps.id, Math.round(event.target.value) || 1)),
    onRemoveClick: () => dispatch(removeItemFromOrder(ownProps.id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderItem)
