import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { submitLogin } from '../../../actions';

const mapStateToProps = state => ({
    text: 'Sign in',
    data: {
        username: state.centerColumn.login.get('username'),
        password: state.centerColumn.login.get('password')
    }
});

const mapDispatchToProps = dispatch => ({
    submit: data => dispatch(submitLogin(data))
});

const LoginButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitButton)

export default LoginButton
