import React from 'react';
import { connect } from 'react-redux';

import LeftColumn from './LeftColumn';
import CenterColumn from './CenterColumn';
import RightColumn from './RightColumn';
import Modal from './Modal';
import {
    fetchActiveOrders, fetchPendingOrders,
    fetchRestaurants, updateRestaurantHours
} from '../actions';

class App extends React.Component {
    componentDidMount() {
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
                <Modal/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    loadRestaurants: () => dispatch(fetchRestaurants()),
    loadActiveOrders: () => dispatch(fetchActiveOrders()),
    loadPendingOrders: () => dispatch(fetchPendingOrders()),
    updateRestaurantHours: () => dispatch(updateRestaurantHours())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
