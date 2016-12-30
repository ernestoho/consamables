import '../../../styles/panels/active-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import ActiveOrderBox from './ActiveOrderBox';
import { getRestaurantName } from '../../../selectors';

class ActiveOrderPanel extends React.Component {
    render() {
        const { groups } = this.props;

        return (
                <div className="active-order-panel">
                    <PanelHeader name="Active Orders"></PanelHeader>
                    {groups.map(result =>
                        <ActiveOrderBox key={result.get('groupId')} {...result.toJS()}></ActiveOrderBox>
                    )}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        groups: state.activeOrders.toList().map(
            group => group.set('restaurantName', getRestaurantName(
                state,
                group.get('restaurantId')
            ))
        )
    };
};

export default connect(
    mapStateToProps
)(ActiveOrderPanel)