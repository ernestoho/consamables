import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { suggestedOrderSelectors, suggestedOrderActions } from 'data/suggestedOrder';

const WaitTimePreference = ({ value, onChange }) => (
  <div className="suggestion-option">
    <div className="suggestion-option-heading">How long can you wait?</div>
    <input
      className="wait-time"
      type="range"
      min="10"
      max="120"
      step="5"
      value={value}
      onChange={onChange}
    />
    <div className="range-label">{value} minutes</div>
  </div>
);

WaitTimePreference.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getWaitTimePreference } = suggestedOrderSelectors;
const { setWaitTimePreference } = suggestedOrderActions;

const mapStateToProps = state => ({
  value: getWaitTimePreference(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(setWaitTimePreference(parseInt(e.currentTarget.value, 10), 'suggest')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaitTimePreference);
