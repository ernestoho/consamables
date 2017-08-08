import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentOrderSelectors, currentOrderActions } from 'data/currentOrder';

const OrderDurationPreference = ({ value, onChange }) => (
  <div className="order-option">
    <div className="order-option-heading">How long should this be open?</div>
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

OrderDurationPreference.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getOrderDuration } = currentOrderSelectors;
const { setOrderDuration } = currentOrderActions;

const mapStateToProps = state => ({
  value: getOrderDuration(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(setOrderDuration(parseInt(e.currentTarget.value, 10))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDurationPreference);
