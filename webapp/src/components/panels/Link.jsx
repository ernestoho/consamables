import React from 'react';

export default class Link extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        window.open('http://' + this.props.url);
    }

    render() {
        return (
            <div className="link" onClick={this.handleClick}>
                {this.props.url.slice(4)}
            </div>
        );
    }
}
