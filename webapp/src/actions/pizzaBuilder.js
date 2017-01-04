import {
    OPEN_PIZZA_BUILDER, CLOSE_PIZZA_BUILDER,
    TOGGLE_TOPPING, CHANGE_TOPPING_SIDE,
    SET_INITIAL_SAUCE, SET_MAX_TOPPINGS,
    CHANGE_SAUCE, CHANGE_CHEESE
} from './actionTypes';

export const openPizzaBuilder = itemId => ({
    type: OPEN_PIZZA_BUILDER,
    id: itemId
});

export const closePizzaBuilder = () => ({
    type: CLOSE_PIZZA_BUILDER
});

export const toggleTopping = topping => ({
    type: TOGGLE_TOPPING,
    name: topping
});

export const changeToppingSide = (topping, side) => ({
    type: CHANGE_TOPPING_SIDE,
    name: topping,
    side: side
});

export const setInitialSauce = sauce => ({
    type: SET_INITIAL_SAUCE,
    value: sauce
});

export const setMaxToppings = value => ({
    type: SET_MAX_TOPPINGS,
    value: value
});

export const changeSauce = sauce => ({
    type: CHANGE_SAUCE,
    value: sauce
});

export const changeCheese = cheese => ({
    type: CHANGE_CHEESE,
    value: cheese
});
