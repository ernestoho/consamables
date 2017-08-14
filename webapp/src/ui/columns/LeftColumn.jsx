import React from 'react';

import ActiveGroupPanel from '../panels/ActiveGroupPanel';
import PendingGroupPanel from '../panels/PendingGroupPanel';

import './column.scss';

const LeftColumn = () => (
  <div className="column-left">
    <ActiveGroupPanel />
    <PendingGroupPanel />
  </div>
);

export default LeftColumn;
