import { connect } from 'react-redux';

import { pizzaBuilderSelectors, pizzaBuilderActions } from 'data/pizzaBuilder';

import PizzaAttributeSelection from './PizzaAttributeSelection';

const { getCurrentCheese } = pizzaBuilderSelectors;
const { changeCheese } = pizzaBuilderActions;

const mapStateToProps = state => ({
  name: 'Cheese',
  currentValue: getCurrentCheese(state),
});

const mapDispatchToProps = dispatch => ({
  changeValue: value => dispatch(changeCheese(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PizzaAttributeSelection);
