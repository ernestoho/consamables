import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginSelectors, loginActions } from 'data/login';

const PasswordField = ({ value, onChange }) => (
  <div className="login-field">
    <div className="credential-label">Password</div>
    <input type="password" name="password" value={value} onChange={onChange} />
  </div>
);

PasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getPassword } = loginSelectors;
const { updatePasswordField } = loginActions;

const mapStateToProps = state => ({
  value: getPassword(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(updatePasswordField(e.currentTarget.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordField);
