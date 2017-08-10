import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { pizzaBuilderActions } from 'data/pizzaBuilder';

const AddPizzaButton = ({ onAdd }) => (
  <button className="button" onClick={onAdd}>Add to Order</button>
);

AddPizzaButton.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

const { addPizzaToOrder } = pizzaBuilderActions;

const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch(addPizzaToOrder()),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(AddPizzaButton);
