import '../../../styles/panels/organized-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import moment from 'moment';

import GroupDetailsCloseButton from './GroupDetailsCloseButton';
import OrderTimer from '../OrderTimer';
import IndividualOrder from './IndividualOrder';
import { getRestaurantName } from '../../../selectors';
import { markGroupOrdered, markGroupComplete } from '../../../actions';

class OrganizedOrderPanel extends React.Component {
    render() {
        const {
            groupId, orders, restaurantName, type, phase, timeStarted, duration, ended,
            markGroupOrdered, markGroupComplete
        } = this.props;

        return (
            <div className="organized-order-panel">
                <div className="group-details-header">
                    <GroupDetailsCloseButton/>
                    <div className="group-details-heading">
                        Group Order from {restaurantName}
                    </div>
                <div className="group-details-toolbar">
                    <div className="info">
                        <div className="group-type">
                            {type.charAt(0).toUpperCase()}{type.slice(1)}
                        </div>
                        <OrderTimer timeStarted={timeStarted} duration={duration}/>
                    </div>
                    <div className="status-container">
                        <div className={`status${phase == 'active' ? ' not-ordered' : ' ordered'}`}>
                            {phase == 'active' ? 'Not Ordered' : 'Ordered'}
                        </div>
                    </div>
                    <div className="controls">
                        {ended ?
                            (phase == 'active' ?
                                <button className="button"
                                    onClick={() => markGroupOrdered(groupId)}
                                >
                                    Mark as ordered
                                </button>
                                : <button className="button"
                                    onClick={() => markGroupComplete(groupId)}
                                >
                                    Mark complete
                                </button>)
                            : null}
                        <button className="button">Message group members</button>
                    </div>
                </div>
                </div>
                <div className="orders">
                    <div className="orders-heading">Individual Orders</div>
                    {orders.map(order =>
                        <IndividualOrder key={order.get('userId')} {...order.toObject()}/>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const groupId = state.centerColumn.organizer.get('groupId');
    const group = state.organizedOrders.get(groupId);
    return {
        groupId: groupId,
        // Merge order items, in case people have placed multiple orders
        orders: group.get('orders').reduce((orders, order) => {
            const id = order.get('userId');
            return orders.setIn([id, 'userId'], id)
                .updateIn(
                    [id, 'orderItems'],
                    List(),
                    orderItems => orderItems.concat(order.get('orderItems'))
                )
        }, Map())
            .toList()
            .map( order => order.set('username', state.users.get(order.get('userId'))) ),
        restaurantName: getRestaurantName(state, group.get('restaurantId')),
        type: group.get('type'),
        phase: group.get('phase'),
        timeStarted: group.get('timeStarted'),
        duration: group.get('durationMinutes'),
        ended: moment(group.get('timeStarted'))
            .add(group.get('durationMinutes'), 'minutes')
            .isBefore(moment())
    };
};

const mapDispatchToProps = dispatch => ({
    markGroupOrdered: id => dispatch(markGroupOrdered(id)),
    markGroupComplete: id => dispatch(markGroupComplete(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizedOrderPanel)
