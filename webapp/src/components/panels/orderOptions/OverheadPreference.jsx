import React from 'react';
import { connect } from 'react-redux';

import { setOverhead } from '../../../actions';

class OverheadPreference extends React.Component {
  render() {
    const { value, changeValue } = this.props;

    return (
      <div className="order-option">
        <div className="order-option-heading">How much do you need to cover delivery and other costs?</div>
        <div className="order-option-heading">Don't include meal tax.</div>
        <input className="overhead-percentage" type="range" min="0" max="20" step="1"
          value={value}
          onChange={changeValue}
        />
        <div className="range-label">{value}%</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.centerColumn.currentOrder.getIn(['options', 'overhead'])
});

const mapDispatchToProps = dispatch => ({
  changeValue: e => dispatch(setOverhead(parseInt(e.currentTarget.value)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverheadPreference);
