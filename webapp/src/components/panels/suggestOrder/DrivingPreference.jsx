import React from 'react';
import { connect } from 'react-redux';

import { setDrivingPreference } from '../../../actions';

class DrivingPreference extends React.Component {
    render() {
        const {
            checked,
            drivingYes, drivingNo
        } = this.props;

        return (
            <div className="suggest-option">
                <div className="suggest-option-heading">Willing to drive?</div>
                <div className="suggest-option-choices">
                    <label>
                        <input 
                            type="radio"
                            checked={checked}
                            onChange={drivingYes}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={!checked}
                            onChange={drivingNo}
                        />
                        No
                    </label>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    checked: state.centerColumn.suggestOrder.get('driving')
});

const mapDispatchToProps = dispatch => ({
    drivingYes: value => dispatch(setDrivingPreference(true)),
    drivingNo: () => dispatch(setDrivingPreference(false))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrivingPreference)
