import '../styles/column.scss';

import React from 'react';
import { connect } from 'react-redux';

import ActiveOrderPanel from './panels/activeOrder/ActiveOrderPanel';
import PendingOrderPanel from './panels/pendingOrder/PendingOrderPanel';

export default class LeftColumn extends React.Component {
  render() {
    return (
      <div className="column-left">
        <ActiveOrderPanel/>
        <PendingOrderPanel/>
      </div>
    );
  }
}
