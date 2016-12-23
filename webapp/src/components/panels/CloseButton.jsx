import React from 'react';

export default class CloseButton extends React.Component {
    render() {
        return (
            <div className="close-button" onClick={this.props.onClick}>×</div>
        );
    }
}
