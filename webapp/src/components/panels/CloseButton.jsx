import React from 'react';
import { Link } from 'react-router';

export default class CloseButton extends React.Component {
    render() {
        return (
            <Link to="/" className="close-button">×</Link>
        );
    }
}
