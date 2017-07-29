import '../styles/overlay.scss';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
};

class Overlay extends React.Component {
  render() {
    const {
      centerFocus, loggedIn,
      onClick
    } = this.props;

    return (
      <div
        className="overlay"
        style={centerFocus ? overlayStyles.visible : overlayStyles.hidden}
        onClick={loggedIn ? onClick : null}
      >
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.currentUser.get('loggedIn')
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(push('/'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overlay);
