import '../styles/column.scss'

import React from 'react';
import { connect } from 'react-redux';

import Title from './Title';
import Helper from './Helper';
import MenuPanel from './panels/menu/MenuPanel';
import CurrentOrderPanel from './panels/currentOrder/CurrentOrderPanel';
import {
    DISPLAY_DEFAULT,
    DISPLAY_MENU_VIEWING,
    DISPLAY_MENU_ORDERING,
    DISPLAY_MENU_WITH_ORDER,
    DISPLAY_ORDER_CONFIRM
} from '../constants';

class CenterColumn extends React.Component {
    render() {
        switch(this.props.display) {
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
                    </div>
                );
            case DISPLAY_MENU_WITH_ORDER:
                return (
                    <div className="column-center">
                        <Title/>
                        <MenuPanel/>
                        <CurrentOrderPanel/>
                    </div>
                );
            case DISPLAY_ORDER_CONFIRM:
                return (
                    <div className="column-center">

                    </div>
                );
            default:
                return (
                    <div className="column-center">
                        <Title/>
                        <div className="padding"></div>
                        <Helper/>
                    </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    display: state.centerColumn.get('display')
});

export default connect(
    mapStateToProps
)(CenterColumn)
