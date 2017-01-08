import '../styles/column.scss'

import React from 'react';
import { connect } from 'react-redux';

import Title from './Title';
import Helper from './Helper';
import LoginPanel from './panels/login/LoginPanel';
import CreateAccountPanel from './panels/createAccount/CreateAccountPanel';
import MenuPanel from './panels/menu/MenuPanel';
import CurrentOrderPanel from './panels/currentOrder/CurrentOrderPanel';
import PizzaBuilderPanel from './panels/pizzaBuilder/PizzaBuilderPanel';
import NewGroupOptionsPanel from './panels/orderOptions/NewGroupOptionsPanel';
import NewOrderConfirmPanel from './panels/orderOptions/NewOrderConfirmPanel';
import SuggestOrderPanel from './panels/suggestOrder/SuggestOrderPanel';
import MyOrderSummary from './panels/myOrder/MyOrderSummary';
import OrganizedOrderSummary from './panels/organizedOrder/OrganizedOrderSummary';
import OrganizedOrderPanel from './panels/organizedOrder/OrganizedOrderPanel';
import MyOrderPanel from './panels/myOrder/MyOrderPanel';
import {
    DISPLAY_LOGIN,
    DISPLAY_CREATE_ACCOUNT,
    DISPLAY_MENU_VIEWING,
    DISPLAY_MENU_ORDERING,
    DISPLAY_PIZZA_BUILDER,
    DISPLAY_ORDER_OPTIONS,
    DISPLAY_SUGGEST_OPTIONS,
    DISPLAY_GROUP_DETAILS,
    DISPLAY_ORDER_DETAILS
} from '../constants';

class CenterColumn extends React.Component {
    render() {
        const { displayMode, orderMode, orderStarted, organizer, joinedOrders } = this.props;

        switch (displayMode) {
            case DISPLAY_LOGIN:
                return (
                    <div className="column-center">
                        <Title/>
                        <LoginPanel/>
                    </div>
                );

            case DISPLAY_CREATE_ACCOUNT:
                return (
                    <div className="column-center">
                        <Title/>
                        <CreateAccountPanel/>
                    </div>
                );

            case DISPLAY_MENU_VIEWING:
                return (
                    <div className="column-center">
                        <Title/>
                        <MenuPanel/>
                    </div>
                );

            case DISPLAY_MENU_ORDERING:
                return (
                    <div className="column-center">
                        <Title/>
                        <MenuPanel/>
                        {orderStarted ? 
                            <CurrentOrderPanel/>
                            : null}
                    </div>
                );

            case DISPLAY_PIZZA_BUILDER:
                return (
                    <div className="column-center">
                        <Title/>
                        <PizzaBuilderPanel/>
                    </div>
                );

            case DISPLAY_ORDER_OPTIONS:
                return (
                    <div className="column-center">
                        <Title/>
                        <CurrentOrderPanel/>
                        {orderMode == 'join' ?
                            <NewOrderConfirmPanel/>
                            : <NewGroupOptionsPanel/>}
                    </div>
                );

            case DISPLAY_SUGGEST_OPTIONS:
                return (
                    <div className="column-center">
                        <Title/>
                        <SuggestOrderPanel/>
                    </div>
                );

            case DISPLAY_GROUP_DETAILS:
                return (
                    <div className="column-center">
                        <Title/>
                        <OrganizedOrderPanel/>
                    </div>
                );

            case DISPLAY_ORDER_DETAILS:
                return (
                    <div className="column-center">
                        <Title/>
                        <MyOrderPanel/>
                    </div>
                );

            default:
                return (
                    <div className="column-center">
                        <Title/>
                        {organizer ?
                            <OrganizedOrderSummary/>
                            : null}
                        <Helper/>
                        {joinedOrders ?
                            <MyOrderSummary/>
                            : null}
                    </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    displayMode: state.centerColumn.displayMode,
    orderMode: state.centerColumn.currentOrder.get('mode'),
    orderStarted: !!state.centerColumn.currentOrder.get('items').size,
    organizer: state.organizedOrders.size > 0,
    joinedOrders: state.myOrders.size > 0
        && state.myOrders.filter(order => !state.organizedOrders.has(order.get('groupId'))).size > 0
});

export default connect(
    mapStateToProps
)(CenterColumn)
