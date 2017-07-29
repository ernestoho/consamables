import React from 'react';
import { connect } from 'react-redux';

import { setOrderDuration } from '../../../actions';

class OrderDurationPreference extends React.Component {
  render() {
    const { value, changeValue } = this.props;

    return (
      <div className="order-option">
        <div className="order-option-heading">How long should this be open?</div>
        <input className="wait-time" type="range" min="10" max="120" step="5"
          value={value}
          onChange={changeValue}
        />
        <div className="range-label">{value} minutes</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.centerColumn.currentOrder.getIn(['options', 'duration'])
});

const mapDispatchToProps = dispatch => ({
  changeValue: e => dispatch(setOrderDuration(parseInt(e.currentTarget.value)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDurationPreference);
