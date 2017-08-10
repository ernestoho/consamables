import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { pizzaBuilderSelectors, pizzaBuilderActions } from 'data/pizzaBuilder';

const ToppingSideButton = ({ selected, icon, changeSide }) => (
  <div className={`topping-side${selected ? ' selected' : ''}`} onClick={changeSide}>
    {icon}
  </div>
);

ToppingSideButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  changeSide: PropTypes.func.isRequired,
};

const { getToppingSide } = pizzaBuilderSelectors;
const { changeToppingSide } = pizzaBuilderActions;

const mapStateToProps = (state, { name, side }) => ({
  selected: getToppingSide(state, name) === side,
});

const mapDispatchToProps = (dispatch, { name, side }) => ({
  changeSide: () => dispatch(changeToppingSide(name, side)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToppingSideButton);
