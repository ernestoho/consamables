import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { currentUserSelectors } from 'data/currentUser';

import PendingGroupToolbar from './PendingGroupToolbar';

class PendingGroupBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: moment().diff(moment(props.timeCreated), 'minutes'),
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
      timeElapsed: moment().diff(moment(this.props.timeCreated), 'minutes'),
    });
  }

  render() {
    const { groupId, loggedIn, restaurantName, type, minPeople, votes, hasVoted } = this.props;
    const { timeElapsed } = this.state;

    let timeColor;
    if (timeElapsed < 30) {
      timeColor = 'green';
    } else if (timeElapsed < 60) {
      timeColor = 'darkorange';
    } else {
      timeColor = 'red';
    }

    return (
      <div className="pending-group-box">
        <div className="box-title">{restaurantName}</div>
        <div className="group-type info">
          {type === 'delivery or carryout' ? 'Delivery or Carryout' : 'Outing'}
        </div>
        <div className="info">{votes} of {minPeople} people in queue</div>
        <div className="time-elapsed" style={{ color: timeColor }}>
          Suggested
          {timeElapsed > 0 ? ` ${timeElapsed} ` : ' less than a '}
          {timeElapsed <= 1 ? 'minute ' : 'minutes '}
          ago
        </div>
        {loggedIn ?
          <PendingGroupToolbar id={groupId} hasVoted={hasVoted} />
          : null}
      </div>
    );
  }
}

PendingGroupBox.propTypes = {
  timeCreated: PropTypes.number.isRequired,
  groupId: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  restaurantName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  minPeople: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  hasVoted: PropTypes.bool.isRequired,
};

const { isCurrentUserLoggedIn } = currentUserSelectors;

const mapStateToProps = state => ({
  loggedIn: isCurrentUserLoggedIn(state),
});

export default connect(
  mapStateToProps,
)(PendingGroupBox);
