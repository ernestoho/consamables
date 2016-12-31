import '../styles/column.scss'

import React from 'react';
import { connect } from 'react-redux';

import Title from './Title';
import Helper from './Helper';
import MenuPanel from './panels/menu/MenuPanel';
import CurrentOrderPanel from './panels/currentOrder/CurrentOrderPanel';
import NewOrderOptionsPanel from './panels/newOrderOptions/NewOrderOptionsPanel';
import SuggestOrderPanel from './panels/suggestOrder/SuggestOrderPanel';
import {
    DISPLAY_DEFAULT,
    DISPLAY_MENU_VIEWING,
    DISPLAY_MENU_ORDERING,
    DISPLAY_MENU_WITH_ORDER,
    DISPLAY_NEW_ORDER_OPTIONS,
    DISPLAY_SUGGEST_OPTIONS
} from '../constants';

class CenterColumn extends React.Component {
    render() {
        const { displayMode, orderStarted } = this.props;

        switch (displayMode) {
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

            case DISPLAY_NEW_ORDER_OPTIONS:
                return (
                    <div className="column-center">
                        <Title/>
                        <CurrentOrderPanel/>
                        <NewOrderOptionsPanel/>
                    </div>
                );

            case DISPLAY_SUGGEST_OPTIONS:
                return (
                    <div className="column-center">
                        <Title/>
                        <SuggestOrderPanel/>
                    </div>
                );

            default:
                return (
                    <div className="column-center">
                        <Title/>
                        <Helper/>
                    </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    displayMode: state.centerColumn.displayMode,
    orderStarted: !!state.centerColumn.currentOrder.get('items').size
});

export default connect(
    mapStateToProps
)(CenterColumn)
