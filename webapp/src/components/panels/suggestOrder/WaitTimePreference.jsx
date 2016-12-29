import React from 'react';
import { connect } from 'react-redux';

import { setWaitTime } from '../../../actions';

class WaitTimePreference extends React.Component {
    render() {
        const { value, changeValue } = this.props;

        return (
            <div className="suggest-option">
                <div className="suggest-option-heading">How long can you wait?</div>
                <input type="range" min="10" max="120" value={value} step="5"
                    onChange={changeValue}
                />
                <div className="wait-time">{value} minutes</div>
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
