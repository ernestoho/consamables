import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { toJS } from 'common/utils';

import { pizzaBuilderSelectors } from 'data/pizzaBuilder';

const SideToppings = ({ side, toppings }) => (
  <div className="side-toppings">
    <div className="side-label">{_.startCase(side)}</div>
    <div className="side-list">
      {toppings.map(topping => <div className="side-topping" key={topping}>{topping}</div>)}
    </div>
  </div>
);

SideToppings.propTypes = {
  side: PropTypes.oneOf(['left', 'right', 'whole']).isRequired,
  toppings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const { getToppingsOnSide } = pizzaBuilderSelectors;

const mapStateToProps = (state, { side }) => ({
  toppings: getToppingsOnSide(state, side),
});

export default connect(
  mapStateToProps,
)(toJS(SideToppings));
