import '../../../styles/panels/new-order-confirm-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import SubmitNewOrder from './SubmitNewOrder';
import Spinner from '../Spinner';
import { getItemPrice, getOverheadPercentage } from '../../../selectors';

class NewOrderConfirmPanel extends React.Component {
    render() {
        const { loading, orderTotal, id } = this.props;

        return (
            <div className="new-order-confirm-panel">
                <PanelHeader name="Confirm Order"/>
                <div className="confirm-message">
                    Are you sure you want to add your order to this group?
                </div>
                <div className="confirm-message">
                    You'll be charged
                    <span className="order-total"> ${orderTotal} </span>
                    on Splitwise.
                </div>
                <div className="reminder-text">
                    (This includes overhead for tax, delivery, etc.)
                </div>
                {loading ?
                    <Spinner/>
                    : <SubmitNewOrder id={id}/>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    loading: state.centerColumn.currentOrder.get('loading'),
    orderTotal: (Math.ceil(
        state.centerColumn.currentOrder.get('items').reduce(
            (total, item, itemId) => total + (getItemPrice(state, itemId) * item.get('quantity')),
            0
        ) * 1.07 * (getOverheadPercentage(state, parseInt(ownProps.id)) + 1) * 2
        // TODO: make tax not a magic number
    ) * 0.5).toFixed(2)
});

export default connect(
    mapStateToProps
)(NewOrderConfirmPanel)
