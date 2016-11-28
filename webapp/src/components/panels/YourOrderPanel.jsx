import '../../styles/panels/your-order-panel.scss';

import React from 'react';
import PanelHeader from './PanelHeader';

export default class YourOrderPanel extends React.Component {
    render() {
        return (
            <div className="your-order-panel">
                <PanelHeader name="Your Order"></PanelHeader>
            </div>
        );
    }
}
