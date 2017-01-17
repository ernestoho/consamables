import React from 'react';

export default class DrivingPreference extends React.Component {
    render() {
        const { checked, changeValue } = this.props;

        return (
            <div className="suggest-option">
                <div className="suggest-option-heading">Willing to drive?</div>
                <div className="suggest-option-choices">
                    <label>
                        <input 
                            type="radio"
                            checked={checked}
                            onChange={() => changeValue(true)}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={!checked}
                            onChange={() => changeValue(false)}
                        />
                        No
                    </label>
                </div>
            </div>
        );
    }
}
