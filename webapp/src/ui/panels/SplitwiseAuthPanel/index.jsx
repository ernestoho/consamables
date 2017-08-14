import React from 'react';

import { PanelHeader, Spinner } from 'common/components';

import './styles.scss';

const SplitwiseAuthPanel = () => (
  <div className="splitwise-auth-panel">
    <PanelHeader name="Authenticating with Splitwise" />
    <Spinner />
  </div>
);

export default SplitwiseAuthPanel;
