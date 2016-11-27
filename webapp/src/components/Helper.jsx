import '../styles/helper.scss';

import React from 'react';

export default class Helper extends React.Component {
    render() {
        return (
            <div className="helper">
                <HelperText className="left-helper" text="Join an existing group"></HelperText>
                <HelperText className="right-helper" text="Explore other options"></HelperText>
            </div>
        )
    }
}

class HelperText extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="helper-text">{this.props.text}</div>
                <div className="arrows">
                    <div className="left-arrow">▼</div>
                    <div className="right-arrow">▼</div>
                </div>
            </div>
        )
    }
}
