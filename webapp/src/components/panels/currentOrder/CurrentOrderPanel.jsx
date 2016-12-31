import '../../../styles/panels/current-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import OrderItem from './OrderItem';
import { continueOrder } from '../../../actions';
import { getItemPrice } from '../../../selectors';

class CurrentOrderPanel extends React.Component {
    render() {
        const {
            items, totalCost,
            onContinueClick
        } = this.props;

        return (
            <div className="current-order-panel">
                <PanelHeader name="Your Order"></PanelHeader>
                <div className="scrollable">
                    {items.map(([id, quantity]) => 
                        <OrderItem key={id} id={id} quantity={quantity}/>
                    )}
                </div>
                <div className="continue">
                    <button className="button" onClick={onContinueClick}>Continue</button>
                    <div className="order-total">Total: ${totalCost.toFixed(2)}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.centerColumn.currentOrder.get('items').entrySeq().toJS(),
    totalCost: state.centerColumn.currentOrder.get('items').reduce((total, quantity, id) => {
        return total += getItemPrice(state, id) * quantity;
    }, 0)
});

const mapDispatchToProps = dispatch => ({
    onContinueClick: () => dispatch(continueOrder())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentOrderPanel)
