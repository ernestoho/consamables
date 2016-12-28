import '../../../styles/panels/suggest-order-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import SuggestCloseButton from './SuggestCloseButton';
import PanelHeader from '../PanelHeader';
import { getRestaurantName } from '../../../selectors';

class SuggestOrderPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 30};
    }

    render() {
        const { name } = this.props;

        return (
            <div className="suggest-order-panel">
                <div className="suggest-header">
                    <SuggestCloseButton/>
                    <PanelHeader name={`Suggest an Order - ${name}`}/>
                </div>
                <div className="suggest-options">
                    <div className="suggest-option">
                        <div className="suggest-option-heading">What works for you?</div>
                        <div className="suggest-option-choices">
                            <label><input type="checkbox"/>Delivery</label>
                            <label><input type="checkbox"/>Carryout</label>
                            <label><input type="checkbox"/>Outing</label>
                        </div>
                    </div>
                    <div className="suggest-option">
                        <div className="suggest-option-heading">Willing to drive?</div>
                        <div className="suggest-option-choices">
                            <label><input type="radio" name="drive"/>Yes</label>
                            <label><input type="radio" name="drive" defaultChecked={true}/>No</label>
                        </div>
                    </div>
                    <div className="suggest-option">
                        <div className="suggest-option-heading">How long can you wait?</div>
                        <input type="range" min="10" max="120" value={this.state.value} step="5"
                            onChange={e => this.setState({value: e.target.value})}
                        />
                        <div>{this.state.value} minutes</div>
                    </div>
                </div>
                <button className="button">Submit Suggestion</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: getRestaurantName(state, state.centerColumn.suggestOrder.get('restaurantId'))
});

export default connect(
    mapStateToProps
)(SuggestOrderPanel)
