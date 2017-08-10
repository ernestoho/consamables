import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { pizzaBuilderSelectors, pizzaBuilderActions } from 'data/pizzaBuilder';

import ToppingSideButton from './ToppingSideButton';

const ToppingOption = ({ name, selected, whole, toggle }) => (
  <div className="topping-option">
    <div
      className={`topping-name${selected ? ' selected' : ''}`}
      onClick={toggle}
    >
      {name}
    </div>
    {selected && whole ?
      <div className="topping-side-select">
        <ToppingSideButton name={name} side="left" icon="◐" />
        <ToppingSideButton name={name} side="whole" icon="◉" />
        <ToppingSideButton name={name} side="right" icon="◑" />
      </div>
      : null}
  </div>
);

ToppingOption.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  whole: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const { isToppingSelected, getPizzaSize } = pizzaBuilderSelectors;
const { toggleTopping } = pizzaBuilderActions;

const mapStateToProps = (state, { name }) => ({
  selected: isToppingSelected(state, name),
  whole: getPizzaSize(state) === 'whole',

});

const mapDispatchToProps = (dispatch, { name }) => ({
  toggle: () => dispatch(toggleTopping(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToppingOption);
