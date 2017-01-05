import '../../../styles/panels/organized-order-summary.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import OrganizedOrderPreview from './OrganizedOrderPreview';
import { showGroupDetails } from '../../../actions';
import { getRestaurantName } from '../../../selectors';

class OrganizedOrderSummary extends React.Component {
    render() {
        const { groups, viewDetails } = this.props;
        return (
            <div className="organized-order-summary">
                <PanelHeader name="Groups You've Organized"/>
                {groups.map(group =>
                    <OrganizedOrderPreview key={group.id}
                        {...group}
                        onClick={() => viewDetails(group.id)}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    groups: state.organizedOrders.map(group => ({
        id: group.get('groupId'),
        restaurantName: getRestaurantName(state, group.get('restaurantId')),
        type: group.get('type'),
        timeStarted: group.get('timeStarted'),
        duration: group.get('durationMinutes')
    })).toList()
});

const mapDispatchToProps = dispatch => ({
    viewDetails: id => dispatch(showGroupDetails(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizedOrderSummary)
