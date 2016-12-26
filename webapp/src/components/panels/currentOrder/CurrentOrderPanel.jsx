import '../../../styles/panels/current-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import OrderItem from './OrderItem';

class CurrentOrderPanel extends React.Component {
    render() {
        return (
            <div className="current-order-panel">
                <PanelHeader name="Your Order"></PanelHeader>
                {this.props.items.map(([id, quantity]) => 
                    <OrderItem key={id} id={id} quantity={quantity}/>
                )}
                <button className="button">Continue</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.centerColumn.get('orderItems').entrySeq().toJS()
});

export default connect(
    mapStateToProps
)(CurrentOrderPanel)
