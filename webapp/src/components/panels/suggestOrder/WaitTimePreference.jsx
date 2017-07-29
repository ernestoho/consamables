import React from 'react';

export default class WaitTimePreference extends React.Component {
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
