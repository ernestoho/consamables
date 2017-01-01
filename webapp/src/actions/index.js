import fetchActiveOrders from './activeOrders';
import fetchPendingOrders from './pendingOrders';
import { fetchRestaurants, updateRestaurantHours } from './restaurants';
import { showMenu, hideMenu } from './menus';
import { showModal, hideModal } from './modal';

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
    showModal,
    hideModal,

    startOrder,
    addItemToOrder,
    removeItemFromOrder,
    incrementItem,
    decrementItem,
    setQuantity,

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
    submitSuggestion
}
