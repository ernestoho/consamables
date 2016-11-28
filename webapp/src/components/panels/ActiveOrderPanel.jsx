import '../../styles/panels/active-order-panel.scss';

import React from 'react';
import PanelHeader from './PanelHeader';

export default class ActiveOrderPanel extends React.Component {
    render() {
        return (
                <div className="current-order-panel">
                    <PanelHeader name="Active Orders"></PanelHeader>
                </div>
        );
    }
}
