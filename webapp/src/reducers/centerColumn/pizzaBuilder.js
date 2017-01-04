import { Map } from 'immutable';

import {
    OPEN_PIZZA_BUILDER, CLOSE_PIZZA_BUILDER,
    TOGGLE_TOPPING, CHANGE_TOPPING_SIDE,
    SET_INITIAL_SAUCE, SET_MAX_TOPPINGS,
    CHANGE_SAUCE, CHANGE_CHEESE,
    ADD_ITEM_TO_ORDER
} from '../../actions/actionTypes';

import { pizzaOverCapacity } from '../../helpers';

const pizzaBuilder = (state = Map({ toppings: Map() }), action) => {
    let newState;

    switch (action.type) {
        case OPEN_PIZZA_BUILDER:
            return state.set('itemId', action.id)
                        .set('cheese', 'Normal Cheese');

        case TOGGLE_TOPPING:
            if (state.hasIn(['toppings', action.name])) {
                return state.deleteIn(['toppings', action.name]);

            } else {
                newState = state.setIn(['toppings', action.name], 'whole');

                if (pizzaOverCapacity(newState)) {
                    newState = state.setIn(['toppings', action.name], 'left');

                    if (pizzaOverCapacity(newState)) {
                        return state;
                    }
                }
                return newState;
            }

        case CHANGE_TOPPING_SIDE:
            newState = state.setIn(['toppings', action.name], action.side);
            if (pizzaOverCapacity(newState)) {
                return state;
            } else {
                return newState;
            }

        case SET_INITIAL_SAUCE:
            return state.set('defaultSauce', action.value)
                        .set('sauce', action.value);

        case SET_MAX_TOPPINGS:
            return state.set('maxToppings', action.value);

        case CHANGE_SAUCE:
            newState = state.set('sauce', action.value);
            if (pizzaOverCapacity(newState)) {
                return state;
            } else {
                return newState;
            }

        case CHANGE_CHEESE:
            newState = state.set('cheese', action.value);
            if (pizzaOverCapacity(newState)) {
                return state;
            } else {
                return newState;
            }

        case ADD_ITEM_TO_ORDER:
            return state.clear().set('toppings', Map());

        default:
            return state;
    }
};

export default pizzaBuilder
