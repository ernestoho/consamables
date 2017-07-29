import React from 'react';
import { connect } from 'react-redux';

import CenterColumn from './CenterColumn';
import LoginPanel from '../panels/login/LoginPanel';

export default class Login extends React.Component {
  render() {
    return (
      <CenterColumn>
        <LoginPanel/>
      </CenterColumn>
    );
  }
}
