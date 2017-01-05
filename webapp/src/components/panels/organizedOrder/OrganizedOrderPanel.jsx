import '../../../styles/panels/organized-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import GroupDetailsCloseButton from './GroupDetailsCloseButton';
import OrderTimer from '../OrderTimer';
import IndividualOrder from './IndividualOrder';
import { getRestaurantName } from '../../../selectors';

class OrganizedOrderPanel extends React.Component {
    render() {
        const { orders, restaurantName, type, timeStarted, duration } = this.props;

        return (
            <div className="organized-order-panel">
                <div className="group-details-header">
                    <GroupDetailsCloseButton/>
                    <div className="group-details-heading">
                        Group Order from {restaurantName}
                    </div>
                    <OrderTimer timeStarted={timeStarted} duration={duration}/>
                    <div className="group-details-subheading">
                        {type.charAt(0).toUpperCase()}{type.slice(1)}
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
    const group = state.organizedOrders.get(state.centerColumn.organizer.get('groupId'));
    return {
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
        timeStarted: group.get('timeStarted'),
        duration: group.get('durationMinutes')
    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizedOrderPanel)
