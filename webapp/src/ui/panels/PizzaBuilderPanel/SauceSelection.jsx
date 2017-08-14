import { connect } from 'react-redux';

import { pizzaBuilderSelectors, pizzaBuilderActions } from 'data/pizzaBuilder';

import PizzaAttributeSelection from './PizzaAttributeSelection';

const { getCurrentSauce } = pizzaBuilderSelectors;
const { changeSauce } = pizzaBuilderActions;

const mapStateToProps = state => ({
  name: 'Sauce',
  currentValue: getCurrentSauce(state),
});

const mapDispatchToProps = dispatch => ({
  changeValue: value => dispatch(changeSauce(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PizzaAttributeSelection);
