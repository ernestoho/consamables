import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { groupSelectors } from 'data/groups';

import { CloseButton, PanelHeader } from 'common/components';
import DrivingPreference from '../SuggestionPanel/DrivingPreference';
import WaitTimePreference from '../SuggestionPanel/WaitTimePreference';
import SubmitVote from './SubmitVote';

import './styles.scss';

const VotingPanel = ({ id, name }) => (
  <div className="suggestion-panel">
    <div className="suggestion-header">
      <CloseButton />
      <PanelHeader name="Vote for this Order" />
      <div className="restaurant-name">{name}</div>
    </div>
    <div className="suggestion-options">
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
