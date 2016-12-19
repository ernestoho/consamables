import '../../../styles/panels/active-order-panel.scss';

import React from 'react';
import moment from 'moment';

import PanelHeader from '../PanelHeader';
import ActiveOrderBox from './ActiveOrderBox';

export default class ActiveOrderPanel extends React.Component {
    constructor() {
        super();
        this.state = { groups: [] };
    }

    componentDidMount() {
        fetch('/api/groups/active').then(response => {
            response.json().then(json => {
                this.setState({ groups: json });
            });
        });
    }

render() {
        return (
                <div className="active-order-panel">
                    <PanelHeader name="Active Orders"></PanelHeader>
                    {this.state.groups.map(result =>
                        <ActiveOrderBox key={result.groupId} {...result}></ActiveOrderBox>
                    )}
                </div>
        );
    }
}
