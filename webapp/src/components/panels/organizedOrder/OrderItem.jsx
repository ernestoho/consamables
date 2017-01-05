import React from 'react';
import { connect } from 'react-redux';

import { getItemName } from '../../../selectors';

class OrderItem extends React.Component {
    render() {
        const { name, quantity, data } = this.props;
        return (
            <div className="order-item">
                <div className="order-item-name">{name}</div>
                {data ? (
                    data.has('pizza') ?
                        <PizzaDetails {...data.get('pizza').toObject()}/>
                        : <OrderItemData data={data.toJS()}/>
                ) : null}
            </div>
        );
    }
}

class PizzaDetails extends React.Component {
    render() {
        const { toppings, sauce, cheese, size } = this.props;

        return (
            <div className="item-data">
                <div className="pizza-size">{size.charAt(0).toUpperCase()}{size.slice(1)}</div>
                <div>{cheese}</div>
                <div>{sauce}</div>
                
            </div>
        );
    }
}

class OrderItemData extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="item-data">
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    name: getItemName(state, ownProps.itemId)
});

export default connect(
    mapStateToProps
)(OrderItem)
