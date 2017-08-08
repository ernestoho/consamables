import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginSelectors, loginActions } from 'data/login';

const UsernameField = ({ value, onChange }) => (
  <div className="login-field">
    <div className="credential-label">Email</div>
    <input type="text" name="username" value={value} onChange={onChange} />
  </div>
);

UsernameField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { getUsername } = loginSelectors;
const { updateUsernameField } = loginActions;

const mapStateToProps = state => ({
  value: getUsername(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(updateUsernameField(e.currentTarget.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsernameField);
