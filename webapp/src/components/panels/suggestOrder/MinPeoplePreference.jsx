import React from 'react';
import { connect } from 'react-redux';

import { setMinPeople } from '../../../actions';

class MinPeoplePreference extends React.Component {
    render() {
        const { value, changeValue } = this.props;

        return (
            <div className="suggest-option">
                <div className="suggest-option-heading">How many more people would it take?</div>
                <input className="min-people" type="range" min="1" max="4" step="1"
                    value={value}
                    onChange={changeValue}
                />
                <div className="range-label">{value} {value > 1 ? 'people' : 'person'}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    value: state.centerColumn.suggestOrder.get('minPeople')
});

const mapDispatchToProps = dispatch => ({
    changeValue: e => dispatch(setMinPeople(e.currentTarget.value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MinPeoplePreference)
