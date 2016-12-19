import '../../../styles/panels/credentials-panel.scss';

import React from 'react';
import PanelHeader from '../PanelHeader';

export default class CredentialsPanel extends React.Component {
    render() {
        return (
            <div className="credentials-panel">
                <div className="signed-in">
                    <div>Currently signed in as</div>
                    <div className="email">sam@students.olin.edu</div>
                    <div className="logout">
                        <button className="button">Sign out</button>
                    </div>
                </div>
            </div>
        );
    }
}
