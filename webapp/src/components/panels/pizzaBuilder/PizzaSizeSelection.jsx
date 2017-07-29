import React from 'react';
import { connect } from 'react-redux';

import { setPizzaSize } from '../../../actions';

class PizzaSize extends React.Component {
  render() {
    const { size, selected, onClick } = this.props;
    return (
      <div
        className={`size-option${selected ? ' selected' : ''}`}
        onClick={onClick}
      >
        {size.charAt(0).toUpperCase()}{size.slice(1)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selected: state.centerColumn.pizzaBuilder.get('size') == ownProps.size
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setPizzaSize(ownProps.size))
});

const LivePizzaSize = connect(
  mapStateToProps,
  mapDispatchToProps
)(PizzaSize);

export default class PizzaSizeSelection extends React.Component {
  render() {
    return (
      <div className="pizza-size">
        <LivePizzaSize size="half"/>
        <LivePizzaSize size="whole"/>
      </div>
    );
  }
}
