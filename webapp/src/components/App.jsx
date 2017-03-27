import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import Overlay from './Overlay';
import {
    verifyUser, verifyAndAuthenticateWithSplitwise,
    fetchActiveOrders, fetchPendingOrders,
    fetchRestaurants, updateRestaurantHours,
} from '../actions';

class App extends Component {
    componentDidMount() {
        const {
            location, loggedIn,
            splitwiseLoad, loadUserInfo, loadRestaurants, loadActiveOrders, loadPendingOrders,
            updateRestaurantHours
        } = this.props;

        if (location.pathname == '/login/splitwise-auth') {
            const { oauth_token, oauth_verifier } = location.query;
            splitwiseLoad(oauth_token, oauth_verifier);
        } else {
            loadUserInfo();
        }
        loadRestaurants();
        loadActiveOrders();
        loadPendingOrders(loggedIn);

        this.restaurantUpdate = setInterval(updateRestaurantHours, 10000);
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

const mapStateToProps = state => ({
    loggedIn: state.currentUser.get('loggedIn')
});

const mapDispatchToProps = dispatch => ({
    splitwiseLoad: (token, verifier) => dispatch(verifyAndAuthenticateWithSplitwise(token, verifier)),
    loadUserInfo: () => dispatch(verifyUser()),
    loadRestaurants: () => dispatch(fetchRestaurants()),
    loadActiveOrders: () => dispatch(fetchActiveOrders()),
    loadPendingOrders: loggedIn => dispatch(fetchPendingOrders(loggedIn)),
    updateRestaurantHours: () => dispatch(updateRestaurantHours())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
