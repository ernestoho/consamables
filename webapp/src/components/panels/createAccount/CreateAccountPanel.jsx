import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { loginSelectors } from 'data/login';

import PanelHeader from '../PanelHeader';
import UsernameField from '../login/UsernameField';
import PasswordCreation from './PasswordCreation';
import CreateAccountButton from './CreateAccountButton';
import Spinner from '../Spinner';

import '../../../styles/panels/login-panel.scss';

const CreateAccountPanel = ({ loading, error }) => (
  <div className="login-panel">
    <PanelHeader name="Create an Account" />
    <div className="login">
      <div className="login-fields">
        <UsernameField />
        <PasswordCreation />
      </div>
      {loading ?
        <Spinner />
        : <CreateAccountButton />}
      {error ?
        <div className="error">{error}</div>
        : null}
    </div>
    <div className="goto-login">
      <div>Already have an account?</div>
      <Link to="/login" className="button">Log in</Link>
    </div>
  </div>
);

CreateAccountPanel.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

CreateAccountPanel.defaultProps = { error: '' };

const { isLoading, getError } = loginSelectors;

const mapStateToProps = state => ({
  loading: isLoading(state),
  error: getError(state),
});

export default connect(
  mapStateToProps,
)(CreateAccountPanel);
