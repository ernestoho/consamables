import '../../styles/panels/splitwise-auth-panel.scss';

import React from 'react';

import CenterColumn from './CenterColumn';
import PanelHeader from '../panels/PanelHeader';
import Spinner from '../panels/Spinner';

export default class SplitwiseAuthenticate extends React.Component {
    render() {
        return (
            <CenterColumn>
                <div className="splitwise-auth-panel">
                    <PanelHeader name="Authenticating with Splitwise"/>
                    <Spinner/>
                </div>
            </CenterColumn>
        );
    }
}
