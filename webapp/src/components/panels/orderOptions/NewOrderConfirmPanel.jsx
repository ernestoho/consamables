import '../../../styles/panels/new-order-confirm-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import SubmitNewOrder from './SubmitNewOrder';
import Spinner from '../Spinner';

class NewOrderConfirmPanel extends React.Component {
    render() {
        const { loading } = this.props;

        return (
            <div className="new-order-confirm-panel">
                <PanelHeader name="Confirm Order"/>
                <div className="confirm-message">
                    Are you sure you want to add your order to this group?
                </div>
                {loading ?
                    <Spinner/>
                    : <SubmitNewOrder/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({ loading: state.centerColumn.currentOrder.get('loading') });

export default connect(
    mapStateToProps
)(NewOrderConfirmPanel)
