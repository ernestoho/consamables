import { connect } from 'react-redux';

import { loginActions } from 'data/login';

import { SubmitButton } from 'common/components';

const { submitNewAccount } = loginActions;

const mapStateToProps = () => ({ text: 'Create account' });

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(submitNewAccount(data)),
});

const CreateAccountButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitButton);

export default CreateAccountButton;
