import React from 'react';
import { connect } from 'react-redux';

import { updatePasswordField, updateConfirmPasswordField } from '../../../actions';

class PasswordCreation extends React.Component {
  render() {
    const {
      passwordValue, confirmPasswordValue,
      onPasswordChange, onConfirmPasswordChange
    } = this.props;

    return (
      <div className="login-field">
        <div className="credential-label">Password</div>
        <input type="password" name="password"
          value={passwordValue}
          onChange={onPasswordChange}
        />
        <div className="credential-label">Confirm Password</div>
        <input type="password" name="confirm-password"
          value={confirmPasswordValue}
          onChange={onConfirmPasswordChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  passwordValue: state.centerColumn.login.get('password'),
  confirmPasswordValue: state.centerColumn.login.get('confirmPassword')
});

const mapDispatchToProps = dispatch => ({
  onPasswordChange: e => dispatch(updatePasswordField(e.currentTarget.value)),
  onConfirmPasswordChange: e => dispatch(updateConfirmPasswordField(e.currentTarget.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordCreation);
