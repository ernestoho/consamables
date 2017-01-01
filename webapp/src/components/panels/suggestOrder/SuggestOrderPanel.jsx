import '../../../styles/panels/suggest-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import SuggestCloseButton from './SuggestCloseButton';
import PanelHeader from '../PanelHeader';
import OrderTypePreference from './OrderTypePreference';
import DrivingPreference from './DrivingPreference';
import WaitTimePreference from './WaitTimePreference';
import MinPeoplePreference from './MinPeoplePreference';
import SubmitSuggestion from './SubmitSuggestion';
import { getRestaurantName } from '../../../selectors';

class SuggestOrderPanel extends React.Component {
    render() {
        const { name, askDriving, valid } = this.props;

        return (
            <div className="suggest-order-panel">
                <div className="suggest-header">
                    <SuggestCloseButton/>
                    <PanelHeader name="Suggest an Order"/>
                    <div className="restaurant-name">{name}</div>
                </div>
                <div className="suggest-options">
                    <OrderTypePreference/>
                    {askDriving ?
                        <DrivingPreference/>
                        : null}
                    <WaitTimePreference/>
                    <MinPeoplePreference/>
                </div>
                {valid ?
                    <SubmitSuggestion/>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const orderType = state.centerColumn.suggestOrder.get('orderType');

    return {
        name: getRestaurantName(state, state.centerColumn.suggestOrder.get('restaurantId')),
        askDriving: orderType.get('carryout') || orderType.get('outing'),
        valid: orderType.includes(true)
    };
};

export default connect(
    mapStateToProps
)(SuggestOrderPanel)
