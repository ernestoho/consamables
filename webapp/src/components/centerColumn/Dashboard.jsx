import React from 'react';
import { connect } from 'react-redux';

import CenterColumn from './CenterColumn';
import Helper from '../Helper';
import MyOrderSummary from '../panels/myOrder/MyOrderSummary';
import OrganizedOrderSummary from '../panels/organizedOrder/OrganizedOrderSummary';

class Dashboard extends React.Component {
    render() {
        const { organizer, joinedOrders } = this.props;

        return (
            <CenterColumn>
                {joinedOrders ?
                    <MyOrderSummary/>
                    : null}
                <Helper/>
                {organizer ?
                    <OrganizedOrderSummary/>
                    : null}
            </CenterColumn>
        );
    }
}

const mapStateToProps = state => ({
    organizer: state.organizedOrders.size > 0,
    joinedOrders: state.myOrders.size > 0
        && state.myOrders.filter(order => !state.organizedOrders.has(order.get('groupId'))).size > 0
});

export default connect(
    mapStateToProps
)(Dashboard)
