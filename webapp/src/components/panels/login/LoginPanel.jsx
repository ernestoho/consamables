import '../../../styles/panels/login-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';
import LoginButton from './LoginButton';
import Spinner from '../Spinner';
import { goToCreateAccount } from '../../../actions';

class LoginPanel extends React.Component {
    render() {
        const {
            loading, error,
            createAccount
        } = this.props;

        return (
            <div className="login-panel">
                <PanelHeader name="Log into Consamables"/>
                <div className="login">
                    <div className="login-fields">
                        <UsernameField/>
                        <PasswordField/>
                    </div>
                    {loading ?
                        <Spinner/>
                        : <LoginButton/>}
                    {error ?
                        <div className="error">{error}</div>
                        : null}
                </div>
                <div className="create-account">
                    <div>Don't have an account yet?</div>
                    <button className="button" onClick={createAccount}>Get started</button>
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
    createAccount: () => dispatch(goToCreateAccount())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPanel)