import '../styles/modal.scss';

import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../actions';

const modalStyles = {
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

class Modal extends React.Component {
    render() {
        return (
            <div
                className="modal"
                style={this.props.visible ? modalStyles.visible : modalStyles.hidden}
                onClick={this.props.onClick}
            >
                <ModalContent/>
            </div>
        );
    }
}


class ModalContent extends React.Component {
    render() {
        return (
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                This is a modal
            </div>
        );
    }
}

const mapStateToProps = state => ({ visible: state.modal.get('visible') });

const mapDispatchToProps = dispatch => {
    return {
        onClick: () => dispatch(hideModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)
