import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { restaurantSelectors } from 'data/restaurants';
import { suggestedOrderSelectors } from 'data/suggestedOrder';

import CloseButton from '../CloseButton';
import PanelHeader from '../PanelHeader';
import OrderTypePreference from './OrderTypePreference';
import DrivingPreference from './DrivingPreference';
import WaitTimePreference from './WaitTimePreference';
import MinPeoplePreference from './MinPeoplePreference';
import SubmitSuggestion from './SubmitSuggestion';

import '../../../styles/panels/suggest-order-panel.scss';

const SuggestOrderPanel = ({ id, name, askDriving, valid }) => (
  <div className="suggest-order-panel">
    <div className="suggest-header">
      <CloseButton />
      <PanelHeader name="Suggest an Order" />
      <div className="restaurant-name">{name}</div>
    </div>
    <div className="suggest-options">
      <OrderTypePreference />
      {askDriving ?
        <DrivingPreference />
        : null}
      <WaitTimePreference />
      <MinPeoplePreference />
    </div>
    {valid ?
      <SubmitSuggestion id={id} />
      : null}
  </div>
);

SuggestOrderPanel.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  askDriving: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};

const { getRestaurantName } = restaurantSelectors;
const { getOrderTypePreference, isOrderTypePreferenceValid } = suggestedOrderSelectors;

const mapStateToProps = (state, { id }) => ({
  name: getRestaurantName(state, id),
  askDriving: (
    getOrderTypePreference(state, 'carryout') || getOrderTypePreference(state, 'outing')
  ),
  valid: isOrderTypePreferenceValid(state),
});

export default connect(
  mapStateToProps,
)(SuggestOrderPanel);
