import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentUserSelectors } from 'data/currentUser';

import RestaurantPanel from './panels/restaurant/RestaurantPanel';
import CredentialsPanel from './panels/credentials/CredentialsPanel';

import '../styles/column.scss';

const RightColumn = ({ loggedIn }) => (
  <div className="column-right">
    <RestaurantPanel />
    {loggedIn ?
      <CredentialsPanel />
      : null}
  </div>
);

RightColumn.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const { isCurrentUserLoggedIn } = currentUserSelectors;

const mapStateToProps = state => ({
  loggedIn: isCurrentUserLoggedIn(state),
});

export default connect(
  mapStateToProps,
)(RightColumn);
