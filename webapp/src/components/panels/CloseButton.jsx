import React from 'react';

export default class CloseButton extends React.Component {
    render() {
        const { onClick } = this.props;

        return (
            <div className="close-button" onClick={onClick}>×</div>
        );
    }
}
