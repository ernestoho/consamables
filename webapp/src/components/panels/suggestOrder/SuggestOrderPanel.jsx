import '../../../styles/panels/suggest-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import { getRestaurantName } from '../../../selectors';

class SuggestOrderPanel extends React.Component {
    render() {
        const { name } = this.props;

        return (
            <div className="suggest-order-panel">
                <PanelHeader name="Suggest an Order"/>
                <div className="restaurant-name">{name}</div>
                <div className="suggest-options">
                    <div className="order-type">
                        <div className="order-type-heading">Order Type (check all that work for you)</div>
                        <label><input type="checkbox"/>Carryout</label>
                        <label><input type="checkbox"/>Delivery</label>
                        <label><input type="checkbox"/>Outing</label>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: getRestaurantName(state, state.centerColumn.get('suggestedRestaurant'))
});

export default connect(
    mapStateToProps
)(SuggestOrderPanel)
