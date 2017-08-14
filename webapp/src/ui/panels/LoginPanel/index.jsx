import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import { loginSelectors } from 'data/login';
import { currentUserSelectors } from 'data/currentUser';

import { PanelHeader, Spinner } from 'common/components';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';
import LoginButton from './LoginButton';

import './styles.scss';

class LoginPanel extends React.Component {
  componentDidMount() {
    const { loggedIn, exitLogin } = this.props;

    if (loggedIn) {
      exitLogin();
    }
  }

  componentWillReceiveProps({ loggedIn }) {
    if (loggedIn) {
      this.props.exitLogin();
    }
  }

  render() {
    const { loading, error } = this.props;

    return (
      <div className="login-panel">
        <PanelHeader name="Log into Consamables" />
        <div className="login">
          <div className="login-fields">
            <UsernameField />
            <PasswordField />
          </div>
          {loading ?
            <Spinner />
            : <LoginButton />}
          {error ?
            <div className="error">{error}</div>
            : null}
        </div>
        <div className="create-account">
          <div>Don&apos;t have an account yet?</div>
          <Link to="/login/create" className="button">Get started</Link>
        </div>
      </div>
    );
  }
}

LoginPanel.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  exitLogin: PropTypes.func.isRequired,
};

LoginPanel.defaultProps = { error: '' };

const { isLoading, getError } = loginSelectors;
const { isCurrentUserLoggedIn } = currentUserSelectors;

const mapStateToProps = state => ({
  loading: isLoading(state),
  error: getError(state),
  loggedIn: isCurrentUserLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  exitLogin: () => dispatch(push('/')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPanel);
