import '../../../styles/panels/suggest-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import CloseButton from '../CloseButton';
import PanelHeader from '../PanelHeader';
import OrderTypePreference from './OrderTypePreference';
import DrivingPreference from './DrivingPreference';
import WaitTimePreference from './WaitTimePreference';
import MinPeoplePreference from './MinPeoplePreference';
import SubmitSuggestion from './SubmitSuggestion';
import { getRestaurantName } from '../../../selectors';
import { setDrivingPreference, setWaitTime } from '../../../actions';

class SuggestOrderPanel extends React.Component {
    render() {
        const {
           id, name, askDriving, valid, drivingValue, waitTimeValue,
            changeDriving, changeWaitTime
        } = this.props;

        return (
            <div className="suggest-order-panel">
                <div className="suggest-header">
                    <CloseButton/>
                    <PanelHeader name="Suggest an Order"/>
                    <div className="restaurant-name">{name}</div>
                </div>
                <div className="suggest-options">
                    <OrderTypePreference/>
                    {askDriving ?
                        <DrivingPreference checked={drivingValue} changeValue={changeDriving}/>
                        : null}
                    <WaitTimePreference value={waitTimeValue} changeValue={changeWaitTime}/>
                    <MinPeoplePreference/>
                </div>
                {valid ?
                    <SubmitSuggestion id={id}/>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const orderType = state.centerColumn.suggestOrder.get('orderType');

    return {
        name: getRestaurantName(state, ownProps.id),
        askDriving: orderType.get('carryout') || orderType.get('outing'),
        valid: orderType.includes(true),
        drivingValue: state.centerColumn.suggestOrder.get('driving'),
        waitTimeValue: state.centerColumn.suggestOrder.get('waitTime')
    };
};

const mapDispatchToProps = dispatch => ({
    changeWaitTime: e => dispatch(setWaitTime(parseInt(e.currentTarget.value), 'suggest')),
    changeDriving: value => dispatch(setDrivingPreference(value, 'suggest'))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuggestOrderPanel)
