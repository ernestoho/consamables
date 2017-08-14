import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { toJS } from 'common/utils';

import { suggestedOrderSelectors, suggestedOrderActions } from 'data/suggestedOrder';

const OrderTypeOption = ({ type, checked, onToggle }) => (
  <label htmlFor={type}>
    <input
      id={type}
      type="checkbox"
      checked={checked}
      onChange={onToggle}
    />
    {_.startCase(type)}
  </label>
);

OrderTypeOption.propTypes = {
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const OrderTypePreference = ({ orderTypes, onToggle }) => (
  <div className="suggestion-option">
    <div className="suggestion-option-heading">What works for you?</div>
    <div className="suggestion-option-choices">
      {['delivery', 'carryout', 'outing'].map(type => (
        <OrderTypeOption
          key={type}
          type={type}
          checked={orderTypes[type]}
          onToggle={() => onToggle(type)}
        />
      ))}
    </div>
  </div>
);

OrderTypePreference.propTypes = {
  orderTypes: PropTypes.objectOf(PropTypes.bool).isRequired,
  onToggle: PropTypes.func.isRequired,
};

const { getOrderTypePreferences } = suggestedOrderSelectors;
const { toggleOrderTypePreference } = suggestedOrderActions;

const mapStateToProps = state => ({
  orderTypes: getOrderTypePreferences(state),
});

const mapDispatchToProps = dispatch => ({
  onToggle: type => dispatch(toggleOrderTypePreference(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(OrderTypePreference));
