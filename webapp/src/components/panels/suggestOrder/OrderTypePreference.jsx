import React from 'react';
import { connect } from 'react-redux';

import { toggleDelivery, toggleCarryout, toggleOuting } from '../../../actions';

class OrderTypePreference extends React.Component {
  render() {
    const {
      delivery, carryout, outing,
      toggleDelivery, toggleCarryout, toggleOuting
    } = this.props;

    return (
      <div className="suggest-option">
        <div className="suggest-option-heading">What works for you?</div>
        <div className="suggest-option-choices">
          <label>
            <input
              type="checkbox"
              checked={delivery}
              onChange={toggleDelivery}
            />
            Delivery
          </label>
          <label>
            <input
              type="checkbox"
              checked={carryout}
              onChange={toggleCarryout}
            />
            Carryout
          </label>
          <label>
            <input
              type="checkbox"
              checked={outing}
              onChange={toggleOuting}
            />
            Outing
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.centerColumn.suggestOrder.get('orderType').toJS()
});

const mapDispatchToProps = dispatch => ({
  toggleDelivery: () => dispatch(toggleDelivery()),
  toggleCarryout: () => dispatch(toggleCarryout()),
  toggleOuting: () => dispatch(toggleOuting())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTypePreference);
