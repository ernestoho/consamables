import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentOrderSelectors, currentOrderActions } from 'data/currentOrder';

const OrderTypePreference = ({ value, onChange }) => (
  <div className="order-option">
    <div className="order-option-heading">How do you want to get food?</div>
    <div className="order-option-choices">
      <label htmlFor="delivery">
        <input
          id="delivery"
          type="radio"
          value="delivery"
          checked={value === 'delivery'}
          onChange={onChange}
        />
        Delivery
      </label>
      <label htmlFor="carryout">
        <input
          id="carryout"
          type="radio"
          value="carryout"
          checked={value === 'carryout'}
          onChange={onChange}
        />
        Carryout
      </label>
    </div>
  </div>
);

OrderTypePreference.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getOrderType } = currentOrderSelectors;
const { setOrderType } = currentOrderActions;

const mapStateToProps = state => ({
  value: getOrderType(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(setOrderType(e.currentTarget.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderTypePreference);
