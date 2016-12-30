import React from 'react';
import { connect } from 'react-redux';

import { setWaitTime } from '../../../actions';

class WaitTimePreference extends React.Component {
    render() {
        const { value, changeValue } = this.props;

        return (
            <div className="suggest-option">
                <div className="suggest-option-heading">How long can you wait?</div>
                <input className="wait-time" type="range" min="10" max="120" step="5"
                    value={value}
                    onChange={changeValue}
                />
                <div className="range-label">{value} minutes</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    value: state.centerColumn.suggestOrder.get('waitTime')
});

const mapDispatchToProps = dispatch => ({
    changeValue: e => dispatch(setWaitTime(e.currentTarget.value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WaitTimePreference)
