import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

import { activateOrder } from '../../../actions';

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
        const {
            groupId, loggedIn, restaurantName, type, timeCreated, minPeople, votes,
            onJoinClick, onStartClick
        } = this.props;
        const { timeElapsed } = this.state;

        const timeColor = timeElapsed < 30 ? 'green' : (timeElapsed < 60 ? 'darkorange' : 'red');

        return (
            <div className="pending-order-box">
                <div className="box-title">{restaurantName}</div>
                <div className="order-type info">
                    {type == 'delivery or carryout' ? 'Delivery or Carryout' : 'Outing'}
                </div>
                <div className="info">{votes} of {minPeople} people in queue</div>
                <div className="time-elapsed" style={{ color: timeColor }}>
                    Suggested {timeElapsed > 0 ? timeElapsed : 'less than a'} {(timeElapsed <= 1) ? 'minute' : 'minutes'} ago
                </div>
                {loggedIn ?
                    <PendingOrderToolbar
                        id={groupId}
                        onStartClick={onStartClick}
                        onJoinClick={onJoinClick}
                    />
                    : null}
            </div>
        );
    }
}


class PendingOrderToolbar extends React.Component {
    render() {
        const {
            id,
            onJoinClick, onStartClick
        } = this.props;

        return (
            <div className="toolbar">
                <Link to="" className="button" onClick={onJoinClick}>Join Queue</Link>
                <Link to={`/activate/${id}`} className="button" onClick={onStartClick}>Start Order</Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.currentUser.get('loggedIn')
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onJoinClick: () => {},
    onStartClick: () => dispatch(activateOrder(ownProps.restaurantId, ownProps.groupId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingOrderBox)
