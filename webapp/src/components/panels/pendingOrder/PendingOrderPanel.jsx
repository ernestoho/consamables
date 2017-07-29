import '../../../styles/panels/pending-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import PendingOrderBox from './PendingOrderBox';
import { getRestaurantName } from '../../../selectors';

class PendingOrderPanel extends React.Component {
  render() {
    const { groups } = this.props;

    return (
      <div className="pending-order-panel">
        <PanelHeader name="Pending Orders"/>
        {groups.size > 0 ?
          <div className="scrollable">
            {groups.map(result =>
              <PendingOrderBox key={result.get('groupId')} {...result.toJS()}/>
            )}
          </div>
          :
          <div className="empty-text-container">
            <div className="empty-text">
              No pending orders right now!
            </div>
            <div className="empty-text">
              Feel free to suggest one of your own.
            </div>
          </div>}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return { 
    groups: state.pendingOrders.toList().map(
      group => group.set('restaurantName', getRestaurantName(
        state, 
        group.get('restaurantId')
      ))
    )
  };
};

export default connect(
  mapStateToProps
)(PendingOrderPanel);
