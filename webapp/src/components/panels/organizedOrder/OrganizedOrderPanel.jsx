import '../../../styles/panels/organized-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import GroupDetailsCloseButton from './GroupDetailsCloseButton';
import OrderTimer from '../OrderTimer';
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
                    <div className="group-details-subheading">
                        {type.charAt(0).toUpperCase()}{type.slice(1)}
                    </div>
                    <OrderTimer timeStarted={timeStarted} duration={duration}/>
                </div>
                <div className="orders">
                    <div className="orders-heading">Orders</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const group = state.organizedOrders.get(state.centerColumn.organizer.get('groupId'));
    return {
        orders: group.get('orders'),
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
