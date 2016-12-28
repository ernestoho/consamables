import fetchActiveOrders from './activeOrders';
import fetchPendingOrders from './pendingOrders';
import { fetchRestaurants, updateRestaurantHours } from './restaurants';
import { showMenu, hideMenu } from './menus';
import { showModal, hideModal } from './modal';
import { openSuggestOrder, closeSuggestOrder } from './suggestOrder';
import {
    startOrder,
    addItemToOrder, removeItemFromOrder,
    incrementItem, decrementItem,
    setQuantity
} from './order';

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
    closeSuggestOrder
}
