import { connect } from 'react-redux';

import { loginActions } from 'data/login';

import { SubmitButton } from 'common/components';

const { submitLogin } = loginActions;

const mapStateToProps = () => ({ text: 'Sign in' });

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(submitLogin(data)),
});

const LoginButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitButton);

export default LoginButton;
