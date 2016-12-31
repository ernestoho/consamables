import '../../../styles/panels/new-order-options-panel';

import React from 'react';

import PanelHeader from '../PanelHeader';
import OrderTypePreference from './OrderTypePreference';
import OrderDurationPreference from './OrderDurationPreference';
import SubmitNewGroup from './SubmitNewGroup';

export default class NewOrderOptionsPanel extends React.Component {
    render() {
        return (
            <div className="new-order-options-panel">
                <PanelHeader name="Order Options"/>
                <div className="order-options">
                    <OrderTypePreference/>
                    <OrderDurationPreference/>
                </div>
                <SubmitNewGroup/>
            </div>
        );
    }
}
