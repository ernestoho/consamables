import React from 'react';
import { connect } from 'react-redux';

import { setOrderType } from '../../../actions';

class OrderTypePreference extends React.Component {
  render() {
    const { value, changeValue } = this.props;

    return (
      <div className="order-option">
        <div className="order-option-heading">How do you want to get food?</div>
        <div className="order-option-choices">
          <label>
            <input
              type="radio" value="delivery"
              checked={value == 'delivery'}
              onChange={changeValue}
            />
            Delivery
          </label>
          <label>
            <input
              type="radio" value="carryout"
              checked={value == 'carryout'}
              onChange={changeValue}
            />
            Carryout
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.centerColumn.currentOrder.getIn(['options', 'type'])
});

const mapDispatchToProps = dispatch => ({
  changeValue: e => dispatch(setOrderType(e.currentTarget.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTypePreference);
