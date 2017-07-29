import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import OrderTimer from '../OrderTimer';
import { joinOrder } from '../../../actions';

class ActiveOrderBox extends React.Component {
  render() {
    const {
      groupId, loggedIn, restaurantName, type, orders, timeStarted, durationMinutes,
      joinOrder
    } = this.props;

    return (
      <div className="active-order-box">
        <div className="box-title">{restaurantName}</div>
        <div className="info order-type">{type.charAt(0).toUpperCase()}{type.slice(1)}</div>
        <div className="info">{orders} {orders > 1 ? 'people' : 'person'} in group</div>
        <OrderTimer timeStarted={timeStarted} duration={durationMinutes}/>
        {loggedIn ?
          <div className="toolbar">
            <Link to={`/join/${groupId}`} className="button" onClick={joinOrder}>Join Order</Link>
          </div>
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.currentUser.get('loggedIn')
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  joinOrder: () => dispatch(joinOrder(ownProps.restaurantId, ownProps.groupId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveOrderBox);
