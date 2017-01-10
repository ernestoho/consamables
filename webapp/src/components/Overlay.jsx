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

export default class Overlay extends React.Component {
    render() {
        const { centerFocus, onClick } = this.props;
        return (
            <div
                className="overlay"
                style={centerFocus ? overlayStyles.visible : overlayStyles.hidden}
                onClick={onClick}
            >
            </div>
        );
    }
}
