import fetchActiveOrders from './activeOrders';
import fetchPendingOrders from './pendingOrders';
import { fetchRestaurants, updateRestaurantHours } from './restaurants';
import { showMenu, hideMenu } from './menus';

import {
    verifyUser,
    updateUsernameField, updatePasswordField,
    submitLogin, logOut, goToCreateAccount
} from './login';

import { updateConfirmPasswordField, submitNewAccount, goToLogin } from './createAccount';

import {
    startOrder,
    addItemToOrder, removeItemFromOrder,
    incrementItem, decrementItem,
    setQuantity,
    continueOrder, goBackToMenu,
    setOrderType, setOrderDuration,
    submitNewGroup
} from './order';

import {
    openPizzaBuilder, closePizzaBuilder,
    setPizzaSize,
    toggleTopping, changeToppingSide,
    setInitialSauce, setMaxToppings,
    changeSauce, changeCheese
} from './pizzaBuilder';

import {
    openSuggestOrder, closeSuggestOrder,
    toggleDelivery, toggleCarryout, toggleOuting,
    setDrivingPreference, setWaitTime, setMinPeople,
    submitSuggestion
} from './suggestOrder';

export {
    fetchActiveOrders,
    fetchPendingOrders,
    fetchRestaurants,
    updateRestaurantHours,

    showMenu,
    hideMenu,

    startOrder,
    addItemToOrder,
    removeItemFromOrder,
    incrementItem,
    decrementItem,
    setQuantity,

    openPizzaBuilder,
    closePizzaBuilder,
    setPizzaSize,
    toggleTopping,
    changeToppingSide,
    setInitialSauce,
    setMaxToppings,
    changeSauce,
    changeCheese,

    continueOrder,
    goBackToMenu,
    setOrderType,
    setOrderDuration,
    submitNewGroup,

    openSuggestOrder,
    closeSuggestOrder,
    toggleDelivery,
    toggleCarryout,
    toggleOuting,
    setDrivingPreference,
    setWaitTime,
    setMinPeople,
    submitSuggestion,

    verifyUser,
    updateUsernameField,
    updatePasswordField,
    submitLogin,
    logOut,

    goToLogin,
    goToCreateAccount,
    updateConfirmPasswordField,
    submitNewAccount
}
