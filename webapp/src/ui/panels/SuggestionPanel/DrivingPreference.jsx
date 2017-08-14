import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { suggestedOrderSelectors, suggestedOrderActions } from 'data/suggestedOrder';

const DrivingPreference = ({ checked, onChange }) => (
  <div className="suggestion-option">
    <div className="suggestion-option-heading">Willing to drive?</div>
    <div className="suggestion-option-choices">
      <label
        htmlFor="yes"
      >
        <input
          id="yes"
          type="radio"
          checked={checked}
          onChange={() => onChange(true)}
        />
        Yes
      </label>
      <label
        htmlFor="no"
      >
        <input
          id="no"
          type="radio"
          checked={!checked}
          onChange={() => onChange(false)}
        />
        No
      </label>
    </div>
  </div>
);

DrivingPreference.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getDrivingPreference } = suggestedOrderSelectors;
const { setDrivingPreference } = suggestedOrderActions;

const mapStateToProps = state => ({
  checked: getDrivingPreference(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(setDrivingPreference(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrivingPreference);
