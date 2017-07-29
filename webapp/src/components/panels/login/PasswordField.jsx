import React from 'react';
import { connect } from 'react-redux';

import { updatePasswordField } from '../../../actions';

class PasswordField extends React.Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <div className="login-field">
        <div className="credential-label">Password</div>
        <input type="password" name="password" value={value} onChange={onChange}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.centerColumn.login.get('password')
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(updatePasswordField(e.currentTarget.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordField);
