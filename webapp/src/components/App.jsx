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
        const { location, children } = this.props;

        const centerFocus = !/^\/(menu\/[0-9]+)?$/.test(location.pathname);
        const style = centerFocus ? { minWidth: '30em', padding: '0 15em' } : null;

        return (
            <div style={style}>
                <LeftColumn/>
                {children}
                <RightColumn/>
                <Overlay centerFocus={centerFocus}/>
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }),
    loggedIn: PropTypes.bool.isRequired,
    splitwiseLoad: PropTypes.func.isRequired,
    loadUserInfo: PropTypes.func.isRequired,
    loadRestaurants:PropTypes.func.isRequired,
    loadActiveOrders:PropTypes.func.isRequired,
    loadPendingOrders:PropTypes.func.isRequired,
    updateRestaurantHours:PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

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
