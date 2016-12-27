import fetchActiveOrders from './activeOrders';
import fetchPendingOrders from './pendingOrders';
import { fetchRestaurants, updateRestaurantHours } from './restaurants';
import { showMenu, hideMenu } from './menus';
import { showModal, hideModal } from './modal';
import {
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
    addItemToOrder,
    removeItemFromOrder,
    incrementItem,
    decrementItem,
    setQuantity
}
