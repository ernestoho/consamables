import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { pizzaBuilderSelectors, pizzaBuilderActions } from 'data/pizzaBuilder';

const PizzaSize = ({ size, selected, onClick }) => (
  <div className={`size-option${selected ? ' selected' : ''}`} onClick={onClick}>
    {_.startCase(size)}
  </div>
);

PizzaSize.propTypes = {
  size: PropTypes.oneOf(['half', 'whole']).isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const { getPizzaSize } = pizzaBuilderSelectors;
const { setPizzaSize } = pizzaBuilderActions;

const mapStateToProps = (state, { size }) => ({
  selected: getPizzaSize(state) === size,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setPizzaSize(ownProps.size)),
});

const ConnectedPizzaSize = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PizzaSize);

const PizzaSizeSelection = () => (
  <div className="pizza-size">
    <ConnectedPizzaSize size="half" />
    <ConnectedPizzaSize size="whole" />
  </div>
);

export default PizzaSizeSelection;
