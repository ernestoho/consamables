import React from 'react';

import ActiveOrderPanel from './panels/activeOrder/ActiveOrderPanel';
import PendingOrderPanel from './panels/pendingOrder/PendingOrderPanel';

import '../styles/column.scss';

const LeftColumn = () => (
  <div className="column-left">
    <ActiveOrderPanel />
    <PendingOrderPanel />
  </div>
);

export default LeftColumn;
