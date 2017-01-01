import '../../../styles/panels/new-order-options-panel';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import OrderTypePreference from './OrderTypePreference';
import OrderDurationPreference from './OrderDurationPreference';
import SubmitNewGroup from './SubmitNewGroup';
import Spinner from '../Spinner';

class NewOrderOptionsPanel extends React.Component {
    render() {
        const { loading } = this.props;

        return (
            <div className="new-order-options-panel">
                <PanelHeader name="Order Options"/>
                <div className="order-options">
                    <OrderTypePreference/>
                    <OrderDurationPreference/>
                </div>
                {loading ?
                    <Spinner/>
                : <SubmitNewGroup/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({ loading: state.centerColumn.currentOrder.get('loading') });

export default connect(
    mapStateToProps
)(NewOrderOptionsPanel)
