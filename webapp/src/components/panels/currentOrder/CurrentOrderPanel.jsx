import '../../../styles/panels/current-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import OrderItem from './OrderItem';
import { continueOrder, goBackToMenu } from '../../../actions';
import { getItemPrice } from '../../../selectors';
import { DISPLAY_MENU_ORDERING, DISPLAY_NEW_ORDER_OPTIONS } from '../../../constants';

class CurrentOrderPanel extends React.Component {
    render() {
        const {
            orderStarted, items, stage, totalCost, displayMode,
            onContinueClick, onBackClick
        } = this.props;

        if (orderStarted) {
            return (
                <div className="current-order-panel">
                    <PanelHeader name="Your Order"></PanelHeader>
                    <div className="scrollable">
                        {items.map(item => 
                            <OrderItem key={item.get('id')} id={item.get('id')} quantity={item.get('quantity')}/>
                        )}
                    </div>
                    <div className="continue">
                        {stage == 'choose' ?
                            <button className="button" onClick={onContinueClick}>Continue</button>
                            :
                            <button className="button" onClick={onBackClick}>Return to Menu</button>}
                        <div className="order-total">Total: ${totalCost.toFixed(2)}</div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    orderStarted: !!state.centerColumn.currentOrder.get('items').size,
    items: state.centerColumn.currentOrder.get('items').map((item, id) => item.set('id', id)).toList(),
    totalCost: state.centerColumn.currentOrder.get('items').reduce((total, item, id) => {
        return total += getItemPrice(state, id) * item.get('quantity');
    }, 0),
    stage: state.centerColumn.currentOrder.get('stage')
});

const mapDispatchToProps = dispatch => ({
    onContinueClick: () => dispatch(continueOrder()),
    onBackClick: () => dispatch(goBackToMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentOrderPanel)
