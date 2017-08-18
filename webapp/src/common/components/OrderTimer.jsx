import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class OrderTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finalTime: moment(props.timeStarted).add(props.duration, 'minutes'),
      minutes: 0,
      seconds: 0,
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    const diff = this.state.finalTime.diff(moment());
    const hours = Math.floor((diff / 3600000) % 60);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    this.setState({
      hours: hours > 0 ? hours : 0,
      minutes: minutes > 0 ? minutes : 0,
      seconds: seconds > 0 ? seconds : 0,
    });
  }

  render() {
    let message;
    const style = { };
    const { concise } = this.props;
    const { hours, minutes, seconds } = this.state;

    if (minutes < 5 && hours === 0) {
      style.color = 'red';
    } else if (minutes < 10 && hours === 0) {
      style.color = 'darkorange';
    } else {
      style.color = 'green';
    }

    if (minutes > 0 || seconds > 0 || hours > 0) {
      const displayHours = hours > 0 ? `${hours}:` : '';
      const displayMinutes = hours > 0 && minutes < 10 ? `0${minutes}` : minutes.toString();
      const displaySeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

      message = `${displayHours}${displayMinutes}:${displaySeconds}`;
      if (!concise) {
        message += ' remaining';
      }
    } else {
      message = concise ? 'Closed' : 'Order closed';
    }

    return (
      <div className="order-timer" style={style}>{message}</div>
    );
  }
}

OrderTimer.propTypes = {
  concise: PropTypes.bool,
  timeStarted: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

OrderTimer.defaultProps = { concise: false };
