import '../../../styles/panels/current-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import OrderItem from './OrderItem';
import { getItemPrice } from '../../../selectors';

class CurrentOrderPanel extends React.Component {
    render() {
        const { items, totalCost } = this.props;

        return (
            <div className="current-order-panel">
                <PanelHeader name="Your Order"></PanelHeader>
                {items.map(([id, quantity]) => 
                    <OrderItem key={id} id={id} quantity={quantity}/>
                )}
                <div className="continue">
                    <button className="button">Continue</button>
                    <div className="order-total">Total: ${totalCost.toFixed(2)}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.centerColumn.get('orderItems').entrySeq().toJS(),
    totalCost: state.centerColumn.get('orderItems').reduce((total, quantity, id) => {
        return total += getItemPrice(state, id) * quantity;
    }, 0)
});

export default connect(
    mapStateToProps
)(CurrentOrderPanel)
