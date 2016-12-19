import React from 'react';
import moment from 'moment';

export default class PendingOrderBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: 0
        };
        this.getVotes = this.getVotes.bind(this);
    }

    componentDidMount() {
        this.getVotes();
        this.votesUpdate = setInterval(this.getVotes, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.votesUpdate);
    }

    getVotes() {
        fetch('/api/groups/count-votes/' + this.props.groupId).then(response => {
            response.json().then(json => {
                this.setState({ votes: json });
            });
        });
    }

    render() {
        let timeElapsed = moment().diff(moment(this.props.timeCreated), 'minutes');

        return (
            <div className="pending-order-box">
                <div className="box-title">{this.props.restaurantName}</div>
                <div className="info">{this.state.votes} of {this.props.minPeople} people in queue</div>
                <div className="info">Suggested {timeElapsed} {(timeElapsed === 1) ? 'minute' : 'minutes'} ago</div>
                <PendingOrderToolbar/>
            </div>
        );
    }
}


class PendingOrderToolbar extends React.Component {
    render() {
        return (
            <div className="toolbar">
                <button className="button">Join Queue</button>
                <button className="button">Start Order</button>
            </div>
        );
    }
}
