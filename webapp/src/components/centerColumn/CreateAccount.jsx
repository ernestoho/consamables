import React from 'react';
import { connect } from 'react-redux';

import CenterColumn from './CenterColumn';
import CreateAccountPanel from '../panels/createAccount/CreateAccountPanel';

export default class CreateAccount extends React.Component {
  render() {
    return (
      <CenterColumn>
        <CreateAccountPanel/>
      </CenterColumn>
    );
  }
}
