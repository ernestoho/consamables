import '../../../styles/panels/suggest-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import CloseButton from '../CloseButton';
import PanelHeader from '../PanelHeader';
import DrivingPreference from '../suggestOrder/DrivingPreference';
import WaitTimePreference from '../suggestOrder/WaitTimePreference';
import SubmitVote from './SubmitVote';
import { setDrivingPreference, setWaitTime } from '../../../actions';
import { getGroupRestaurant } from '../../../selectors';

class VotingPanel extends React.Component {
  render() {
    const {
      id, name, drivingValue, waitTimeValue,
      changeDriving, changeWaitTime
    } = this.props;

    return (
      <div className="suggest-order-panel">
        <div className="suggest-header">
          <CloseButton/>
          <PanelHeader name="Vote for this Order"/>
          <div className="restaurant-name">{name}</div>
        </div>
        <div className="suggest-options">
          <DrivingPreference checked={drivingValue} changeValue={changeDriving}/>
          <WaitTimePreference value={waitTimeValue} changeValue={changeWaitTime}/>
        </div>
        <SubmitVote id={id}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: getGroupRestaurant(state, ownProps.id),
  drivingValue: state.centerColumn.vote.get('driving'),
  waitTimeValue: state.centerColumn.vote.get('waitTime')
});

const mapDispatchToProps = dispatch => ({
  changeDriving: value => dispatch(setDrivingPreference(value, 'vote')),
  changeWaitTime: e => dispatch(setWaitTime(parseInt(e.currentTarget.value), 'vote'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VotingPanel);
