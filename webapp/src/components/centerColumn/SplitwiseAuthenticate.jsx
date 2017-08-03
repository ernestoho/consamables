import React from 'react';

import CenterColumn from './CenterColumn';
import PanelHeader from '../panels/PanelHeader';
import Spinner from '../panels/Spinner';

import '../../styles/panels/splitwise-auth-panel.scss';

const SplitwiseAuthenticate = () => (
  <CenterColumn>
    <div className="splitwise-auth-panel">
      <PanelHeader name="Authenticating with Splitwise" />
      <Spinner />
    </div>
  </CenterColumn>
);

export default SplitwiseAuthenticate;
