import '../../../styles/panels/login-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import PanelHeader from '../PanelHeader';
import UsernameField from '../login/UsernameField';
import PasswordCreation from './PasswordCreation';
import CreateAccountButton from './CreateAccountButton';
import Spinner from '../Spinner';
import { goToLogin } from '../../../actions';

class CreateAccountPanel extends React.Component {
  render() {
    const {
      loading, error,
      login
    } = this.props;

    return (
      <div className="login-panel">
        <PanelHeader name="Create an Account"/>
        <div className="login">
          <div className="login-fields">
            <UsernameField/>
            <PasswordCreation/>
          </div>
          {loading ?
            <Spinner/>
            : <CreateAccountButton/>}
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
  }
}

const mapStateToProps = state => ({
  loading: state.centerColumn.login.get('loading'),
  error: state.centerColumn.login.get('error')
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(goToLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountPanel);
