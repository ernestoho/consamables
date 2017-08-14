import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { suggestedOrderSelectors, suggestedOrderActions } from 'data/suggestedOrder';

const MinPeoplePreference = ({ value, onChange }) => (
  <div className="suggestion-option">
    <div className="suggestion-option-heading">How many more people would it take?</div>
    <input
      className="min-people"
      type="range"
      min="1"
      max="4"
      step="1"
      value={value}
      onChange={onChange}
    />
    <div className="range-label">{value} {value > 1 ? 'people' : 'person'}</div>
  </div>
);

MinPeoplePreference.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getMinPeoplePreference } = suggestedOrderSelectors;
const { setMinPeoplePreference } = suggestedOrderActions;

const mapStateToProps = state => ({
  value: getMinPeoplePreference(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(setMinPeoplePreference(parseInt(e.currentTarget.value, 10))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MinPeoplePreference);
