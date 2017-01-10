import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import Overlay from './Overlay';
import {
    verifyUser,
    fetchActiveOrders, fetchPendingOrders,
    fetchRestaurants, updateRestaurantHours
} from '../actions';
import { DISPLAY_DEFAULT, DISPLAY_MENU_VIEWING } from '../constants';

class App extends React.Component {
    componentDidMount() {
        this.props.loadUserInfo();
        this.props.loadRestaurants();
        this.props.loadActiveOrders();
        this.props.loadPendingOrders();

        this.restaurantUpdate = setInterval(this.props.updateRestaurantHours, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.restaurantUpdate);
    }

    render() {
        const centerFocus = !/^\/(menu\/[0-9]+)?$/.test(this.props.location.pathname);
        const style = centerFocus ? { minWidth: '30em', padding: '0 15em' } : null;

        return (
            <div style={style}>
                <LeftColumn/>
                {this.props.children}
                <RightColumn/>
                <Overlay centerFocus={centerFocus}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    loadUserInfo: () => dispatch(verifyUser()),
    loadRestaurants: () => dispatch(fetchRestaurants()),
    loadActiveOrders: () => dispatch(fetchActiveOrders()),
    loadPendingOrders: () => dispatch(fetchPendingOrders()),
    updateRestaurantHours: () => dispatch(updateRestaurantHours())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
