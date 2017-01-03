import React from 'react';
import { connect } from 'react-redux';

import { updateUsernameField } from '../../../actions';

class UsernameField extends React.Component {
    render() {
        const { value, onChange } = this.props;

        return (
            <div className="login-field">
                <div className="credential-label">Email</div>
                <input type="text" name="username" value={value} onChange={onChange}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    value: state.centerColumn.login.get('username')
});

const mapDispatchToProps = dispatch => ({
    onChange: e => dispatch(updateUsernameField(e.currentTarget.value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsernameField)
