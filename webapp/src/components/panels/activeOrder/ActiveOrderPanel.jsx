import '../../../styles/panels/active-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import PanelHeader from '../PanelHeader';
import ActiveOrderBox from './ActiveOrderBox';
import { getRestaurantName } from '../../../selectors';

class ActiveOrderPanel extends React.Component {
  render() {
    const { groups, anyPendingOrders, yourGroups } = this.props;

    return (
      <div className="active-order-panel">
        <PanelHeader name="Active Orders"/>
        {groups.size > 0 ?
          <div className="scrollable">
            {groups.map(result =>
              <ActiveOrderBox key={result.get('groupId')} {...result.toJS()}/>
            )}
          </div>
          :
          (yourGroups > 0 ?
            <div className="empty-text-container">
              <div className="empty-text">No one else is ordering!</div>
            </div>
            :
            <div className="empty-text-container">
              <div className="empty-text">
                No one's ordering right now!
              </div>
              <div className="empty-text">
                {anyPendingOrders ? 'Join a pending order ' : 'Suggest an order '}
                or start one of your own.
              </div>
            </div>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.activeOrders
    .toList()
    .filter(group => {
      return group.get('phase') == 'active'
        && !state.organizedOrders.has(group.get('groupId'))
        && moment(group.get('timeStarted'))
          .add(group.get('durationMinutes'), 'minutes')
          .isAfter(moment());
    })
    .sortBy( group => group.get('timeStarted') )
    .map(
      group => group.set('restaurantName', getRestaurantName(
        state,
        group.get('restaurantId')
      ))
    ),
  anyPendingOrders: state.pendingOrders.size > 0,
  yourGroups: state.organizedOrders.size
});

export default connect(
  mapStateToProps
)(ActiveOrderPanel);
