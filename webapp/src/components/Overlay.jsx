import '../styles/overlay.scss';

import React from 'react';
import { connect } from 'react-redux';

import { DISPLAY_DEFAULT, DISPLAY_MENU_VIEWING } from '../constants';

const overlayStyles = {
    visible: {
        visibility: 'visible',
        opacity: 1,
        transitionDelay: '0s'
    },
    hidden: {
        visibility: 'hidden',
        opacity: 0
    }
}

class Overlay extends React.Component {
    render() {
        return (
            <div
                className="overlay"
                style={this.props.visible ? overlayStyles.visible : overlayStyles.hidden}
                onClick={this.props.onClick}
            >
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { displayMode } = state.centerColumn;
    return {
        visible: !(displayMode == DISPLAY_DEFAULT || displayMode == DISPLAY_MENU_VIEWING)
    };
};

export default connect(
    mapStateToProps
)(Overlay)
