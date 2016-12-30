import fetchActiveOrders from './activeOrders';
import fetchPendingOrders from './pendingOrders';
import { fetchRestaurants, updateRestaurantHours } from './restaurants';
import { showMenu, hideMenu } from './menus';
import { showModal, hideModal } from './modal';

import {
    startOrder,
    addItemToOrder, removeItemFromOrder,
    incrementItem, decrementItem,
    setQuantity
} from './order';

import {
    openSuggestOrder, closeSuggestOrder,
    toggleDelivery, toggleCarryout, toggleOuting,
    setDrivingPreference, setWaitTime
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

    openSuggestOrder,
    closeSuggestOrder,
    toggleDelivery,
    toggleCarryout,
    toggleOuting,
    setDrivingPreference,
    setWaitTime
}