import '../../../styles/panels/voting-panel.scss'

import React from 'react';
import { connect } from 'react-redux';

class VotingPanel extends React.Component {
    render() {
        return (
            <div className="voting-panel"></div>
        );
    }
}

const mapStateToProps = ({});

export default connect(
    mapStateToProps
)(VotingPanel)
