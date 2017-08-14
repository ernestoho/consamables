import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginActions } from 'data/login';
import { groupActions } from 'data/groups';
import { restaurantActions } from 'data/restaurants';
import { currentUserSelectors } from 'data/currentUser';

import LeftColumn from './columns/LeftColumn';
import RightColumn from './columns/RightColumn';
import Overlay from './Overlay';

import './master.scss';

class App extends Component {
  componentDidMount() {
    const {
      location: { pathname, query: { oauth_token, oauth_verifier } }, loggedIn,
      splitwiseLoad, loadUserInfo, loadRestaurants, loadActiveOrders, loadPendingOrders,
      updateRestaurantHours,
    } = this.props;

    if (pathname === '/login/splitwise-auth') {
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
        <LeftColumn />
        {children}
        <RightColumn />
        <Overlay centerFocus={centerFocus} />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  splitwiseLoad: PropTypes.func.isRequired,
  loadUserInfo: PropTypes.func.isRequired,
  loadRestaurants: PropTypes.func.isRequired,
  loadActiveOrders: PropTypes.func.isRequired,
  loadPendingOrders: PropTypes.func.isRequired,
  updateRestaurantHours: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const { verifyUser, verifyAndAuthenticateWithSplitwise } = loginActions;
const { fetchActiveGroups, fetchPendingGroups } = groupActions;
const { fetchRestaurants, updateRestaurantHours } = restaurantActions;
const { isCurrentUserLoggedIn } = currentUserSelectors;

const mapStateToProps = state => ({
  loggedIn: isCurrentUserLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  splitwiseLoad: (token, verifier) => dispatch(verifyAndAuthenticateWithSplitwise(token, verifier)),
  loadUserInfo: () => dispatch(verifyUser()),
  loadRestaurants: () => dispatch(fetchRestaurants()),
  loadActiveOrders: () => dispatch(fetchActiveGroups()),
  loadPendingOrders: loggedIn => dispatch(fetchPendingGroups(loggedIn)),
  updateRestaurantHours: () => dispatch(updateRestaurantHours()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
