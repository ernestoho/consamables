import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentOrderSelectors, currentOrderActions } from 'data/currentOrder';

const OverheadPreference = ({ value, onChange }) => (
  <div className="order-option">
    <div className="order-option-heading">
      How much do you need to cover delivery and other costs?
    </div>
    <div className="order-option-heading">
      Don&apos;t include meal tax.
    </div>
    <input
      className="overhead-percentage"
      type="range"
      min="0"
      max="20"
      step="1"
      value={value}
      onChange={onChange}
    />
    <div className="range-label">{value}%</div>
  </div>
);

OverheadPreference.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getOrderOverhead } = currentOrderSelectors;
const { setOrderOverhead } = currentOrderActions;

const mapStateToProps = state => ({
  value: getOrderOverhead(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(setOrderOverhead(parseInt(e.currentTarget.value, 10))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OverheadPreference);
