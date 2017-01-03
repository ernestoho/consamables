import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class PendingOrderBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: moment().diff(moment(props.timeCreated), 'minutes')
        };
        this.updateTime = this.updateTime.bind(this);
    }

    componentDidMount() {
        this.timeElapsedUpdate = setInterval(this.updateTime, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timeElapsedUpdate);
    }

    updateTime() {
        this.setState({
            timeElapsed: moment().diff(moment(this.props.timeCreated), 'minutes')
        });
    }

    render() {
        const { loggedIn, restaurantName, timeCreated, minPeople, votes } = this.props;
        const { timeElapsed } = this.state;

        return (
            <div className="pending-order-box">
                <div className="box-title">{restaurantName}</div>
                <div className="info">{votes} of {minPeople} people in queue</div>
                <div className="info">
                    Suggested {timeElapsed > 0 ? timeElapsed : 'less than a'} {(timeElapsed <= 1) ? 'minute' : 'minutes'} ago
                </div>
                {loggedIn ?
                    <PendingOrderToolbar/>
                    : null}
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

const mapStateToProps = state => ({
    loggedIn: state.currentUser.get('loggedIn')
});

export default connect(
    mapStateToProps
)(PendingOrderBox)
