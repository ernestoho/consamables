import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { addItemToOrder, closePizzaBuilder } from '../../../actions';

class AddPizzaButton extends React.Component {
    render() {
        const { itemId, data, submit } = this.props;

        return (
            <button className="button" onClick={() => submit(itemId, data)}>Add to Order</button>
        );
    }
}

const mapStateToProps = state => {
    const builder = state.centerColumn.pizzaBuilder;
    const cheese = builder.get('cheese');
    const sauce = builder.get('sauce');
    const toppings = builder.get('toppings');
    const size = builder.get('size');
    return {
        itemId: builder.get('itemId'),
        data: Map({
            pizza: Map({
                cheese: cheese != 'Normal Cheese' ? cheese : undefined,
                sauce: sauce != builder.get('defaultSauce') && size =='whole' ? sauce : undefined,
                toppings: size == 'whole' ? toppings : toppings.keySeq().toList(),
                size: size
            })
        })
    };
};

const mapDispatchToProps = dispatch => ({
    submit: (itemId, data) => {
        dispatch(addItemToOrder(itemId, data));
        dispatch(closePizzaBuilder());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPizzaButton)
