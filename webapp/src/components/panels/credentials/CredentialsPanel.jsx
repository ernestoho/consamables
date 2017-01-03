import '../../../styles/panels/credentials-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import { logOut } from '../../../actions';

class CredentialsPanel extends React.Component {
    render() {
        const {
            loggedIn, username,
            logOut
        } = this.props;

        return (
            <div className="credentials-panel">
                <div className="signed-in">
                    <div>Currently signed in as</div>
                    <div className="email">{username}</div>
                </div>
                <button className="button" onClick={logOut}>Sign out</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.currentUser.get('loggedIn'),
    username: state.currentUser.get('username')
});

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CredentialsPanel)
