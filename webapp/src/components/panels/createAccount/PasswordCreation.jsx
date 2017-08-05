import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginSelectors, loginActions } from 'data/login';

function PasswordCreation({
  passwordValue, confirmPasswordValue,
  onPasswordChange, onConfirmPasswordChange,
}) {
  return (
    <div className="login-field">
      <div className="credential-label">Password</div>
      <input
        type="password"
        name="password"
        value={passwordValue}
        onChange={onPasswordChange}
      />
      <div className="credential-label">Confirm Password</div>
      <input
        type="password"
        name="confirm-password"
        value={confirmPasswordValue}
        onChange={onConfirmPasswordChange}
      />
    </div>
  );
}

PasswordCreation.propTypes = {
  passwordValue: PropTypes.string.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onConfirmPasswordChange: PropTypes.func.isRequired,
};

const { getPassword, getConfirmPassword } = loginSelectors;
const { updatePasswordField, updateConfirmPasswordField } = loginActions;

const mapStateToProps = state => ({
  passwordValue: getPassword(state),
  confirmPasswordValue: getConfirmPassword(state),
});

const mapDispatchToProps = dispatch => ({
  onPasswordChange: e => dispatch(updatePasswordField(e.currentTarget.value)),
  onConfirmPasswordChange: e => dispatch(updateConfirmPasswordField(e.currentTarget.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordCreation);
