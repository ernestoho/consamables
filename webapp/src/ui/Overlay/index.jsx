import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { currentUserSelectors } from 'data/currentUser';

import './styles.scss';

const overlayStyles = {
  visible: {
    visibility: 'visible',
    opacity: 1,
    transitionDelay: '0s',
  },
  hidden: {
    visibility: 'hidden',
    opacity: 0,
  },
};

const Overlay = ({ centerFocus, loggedIn, onClick }) => (
  <div
    className="overlay"
    style={centerFocus ? overlayStyles.visible : overlayStyles.hidden}
    onClick={loggedIn ? onClick : null}
  />
);

Overlay.propTypes = {
  centerFocus: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const { isCurrentUserLoggedIn } = currentUserSelectors;

const mapStateToProps = state => ({
  loggedIn: isCurrentUserLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(push('/')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overlay);
