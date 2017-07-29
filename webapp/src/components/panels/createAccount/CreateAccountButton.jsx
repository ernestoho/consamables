import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { submitNewAccount } from '../../../actions';
import { testUsername, testPassword } from '../../../helpers';

const mapStateToProps = state => {
  const username = state.centerColumn.login.get('username');
  const password = state.centerColumn.login.get('password');
  const confirmPassword = state.centerColumn.login.get('confirmPassword');
  return {
    text: 'Create account',
    data: {
      username: username,
      password: password,
      usernameValid: testUsername(username),
      passwordValid: testPassword(password), 
      passwordMatches: password == confirmPassword
    }
  };
};

const mapDispatchToProps = dispatch => ({
  submit: data => dispatch(submitNewAccount(data))
});

const CreateAccountButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitButton);

export default CreateAccountButton;
