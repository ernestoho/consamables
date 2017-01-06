import React from 'react';
import { connect } from 'react-redux';

import { getItemName } from '../../../selectors';

class OrderItem extends React.Component {
    render() {
        const { name, quantity, data } = this.props;
        const pizzaSize = data ? data.getIn(['pizza', 'size']) : null;
        return (
            <div className="order-item">
                <div className="order-item-name">
                    {name}
                    {pizzaSize ?
                        ` (${pizzaSize.charAt(0).toUpperCase()}${pizzaSize.slice(1)})`
                        : null}
                </div>
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
            <div className="item-data pizza">
                {toppings.size > 0 ?
                    <div className="toppings">
                        {size == 'half' ?
                            toppings.map(topping =>
                                <div className="topping" key={topping}>{topping}</div>
                            )
                            : toppings.map((side, topping) =>
                                <div className="topping" key={topping}>{topping} ({side})</div>
                            ).toList()}
                    </div>
                    : null}
                {cheese || sauce ?
                    <div className="other">
                        <div>{cheese}</div>
                        <div>{sauce}</div>
                    </div>
                    : null}
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
