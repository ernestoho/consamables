import React from 'react';
import { connect } from 'react-redux';

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
    return {
        itemId: builder.get('itemId'),
        data: {
            cheese: builder.get('cheese') != 'Normal Cheese' ? builder.get('cheese') : undefined,
            sauce: builder.get('sauce') != builder.get('defaultSauce') ? builder.get('sauce') : undefined,
            toppings: builder.get('toppings').toJS()
        }
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
