import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { groupSelectors } from 'data/groups';

import CloseButton from '../CloseButton';
import PanelHeader from '../PanelHeader';
import DrivingPreference from '../suggestOrder/DrivingPreference';
import WaitTimePreference from '../suggestOrder/WaitTimePreference';
import SubmitVote from './SubmitVote';

import '../../../styles/panels/suggest-order-panel.scss';

const VotingPanel = ({ id, name }) => (
  <div className="suggest-order-panel">
    <div className="suggest-header">
      <CloseButton />
      <PanelHeader name="Vote for this Order" />
      <div className="restaurant-name">{name}</div>
    </div>
    <div className="suggest-options">
      <DrivingPreference />
      <WaitTimePreference />
    </div>
    <SubmitVote id={id} />
  </div>
);

VotingPanel.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const { getGroupRestaurantName } = groupSelectors;

const mapStateToProps = (state, { id }) => ({
  name: getGroupRestaurantName(state, id, 'pending'),
});

export default connect(
  mapStateToProps,
)(VotingPanel);
