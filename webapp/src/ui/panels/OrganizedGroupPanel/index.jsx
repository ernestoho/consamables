import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { parseId, toJS } from 'common/utils';

import { groupSelectors, groupActions } from 'data/groups';

import { CloseButton, OrderTimer } from 'common/components';
import IndividualOrder from './IndividualOrder';

import './styles.scss';

function OrganizedGroupPanel({
  groupId, orders, restaurantName, type, active, timeStarted, duration, ended,
  markGroupOrdered, markGroupComplete,
}) {
  return (
    <div className="organized-group-panel">
      <div className="group-details-header">
        <CloseButton />
        <div className="group-details-heading">
          Group Order from {restaurantName}
        </div>
        <div className="group-details-toolbar">
          <div className="info">
            <div className="group-type">
              {_.startCase(type)}
            </div>
            <OrderTimer timeStarted={timeStarted} duration={duration} />
          </div>
          <div className="status-container">
            <div className={`status${active ? ' not-ordered' : ' ordered'}`}>
              {active ? 'Not Ordered' : 'Ordered'}
            </div>
          </div>
          <div className="controls">
            <div className="buttons">
              {ended ?
                <button
                  className="button"
                  onClick={active ?
                    () => markGroupOrdered(groupId) :
                    () => markGroupComplete(groupId)
                  }
                >
                  {active ? 'Mark as ordered' : 'Mark complete'}
                </button>
                : null}
              <button className="button">Message group members</button>
            </div>
          </div>
        </div>
      </div>
      <div className="orders">
        <div className="orders-heading">Individual Orders</div>
        {orders.map(order => <IndividualOrder key={order.userId} {...order} />)}
      </div>
    </div>
  );
}

OrganizedGroupPanel.propTypes = {
  groupId: PropTypes.number.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    orderItems: PropTypes.arrayOf(PropTypes.shape({
      itemId: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  restaurantName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  timeStarted: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  ended: PropTypes.bool.isRequired,
  markGroupOrdered: PropTypes.func.isRequired,
  markGroupComplete: PropTypes.func.isRequired,
};

OrganizedGroupPanel.defaultProps = {
  timeStarted: 0,
  duration: 0,
};

const {
  getOrganizedOrders,
  getGroupRestaurantName,
  getGroupAttribute,
  hasGroupClosed,
} = groupSelectors;

const { markGroupOrdered, markGroupComplete } = groupActions;

const mapStateToProps = (state, { id }) => ({
  groupId: id,
  orders: getOrganizedOrders(state, id),
  restaurantName: getGroupRestaurantName(state, id),
  type: getGroupAttribute(state, id, 'organized', 'type'),
  active: getGroupAttribute(state, id, 'organized', 'phase') === 'active',
  timeStarted: getGroupAttribute(state, id, 'organized', 'timeStarted'),
  duration: getGroupAttribute(state, id, 'organized', 'durationMinutes'),
  ended: hasGroupClosed(state, id, 'organized', moment()),
});

const mapDispatchToProps = dispatch => ({
  markGroupOrdered: id => dispatch(markGroupOrdered(id)),
  markGroupComplete: id => dispatch(markGroupComplete(id)),
});

export default parseId(connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(OrganizedGroupPanel)));
