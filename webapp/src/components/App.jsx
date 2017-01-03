import React from 'react';
import { connect } from 'react-redux';

import LeftColumn from './LeftColumn';
import CenterColumn from './CenterColumn';
import RightColumn from './RightColumn';
import Overlay from './Overlay';
import {
    verifyUser,
    fetchActiveOrders, fetchPendingOrders,
    fetchRestaurants, updateRestaurantHours
} from '../actions';

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
        return (
            <div>
                <LeftColumn/>
                <CenterColumn/>
                <RightColumn/>
                <Overlay/>
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
