import '../../../styles/panels/pending-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import PendingOrderBox from './PendingOrderBox';
import { getRestaurantName } from '../../../selectors';

class PendingOrderPanel extends React.Component {
    render() {
        return (
            <div className="pending-order-panel">
                <PanelHeader name="Pending Orders"></PanelHeader>
                {this.props.groups.map(result =>
                    <PendingOrderBox key={result.get('groupId')} {...result.toJS()}></PendingOrderBox>
                )}
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
)(PendingOrderPanel)
