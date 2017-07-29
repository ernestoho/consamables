import React from 'react';

import CenterColumn from './CenterColumn';
import SuggestOrderPanel from '../panels/suggestOrder/SuggestOrderPanel';

export default class Suggest extends React.Component {
  render() {
    const { params } = this.props;

    return (
      <CenterColumn>
        <SuggestOrderPanel id={parseInt(params.id)}/>
      </CenterColumn>
    );
  }
}
