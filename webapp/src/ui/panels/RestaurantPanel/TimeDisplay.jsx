import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TimeDisplay = ({ open, openTime, closeTime }) => {
  let messagePrefix;
  let targetTime;
  let displayTime;
  const style = { };

  const now = moment();

  if (open) {
    targetTime = moment(closeTime);

    if (targetTime.diff(now, 'minutes') < 60) {
      messagePrefix = 'Closing at';
      style.color = 'darkorange';
    } else {
      messagePrefix = 'Open until';
      style.color = 'green';
    }
  } else {
    targetTime = moment(openTime);

    if (now.day() !== targetTime.day()) {
      messagePrefix = 'Opening tomorrow at';
    } else {
      messagePrefix = 'Opening at';
    }
    style.color = 'red';
  }

  if (targetTime.minutes() > 0) {
    displayTime = targetTime.format('h:mA');
  } else {
    displayTime = targetTime.format('hA');
  }

  return (
    <div className="time-display" style={style}>
      {messagePrefix} {displayTime}
    </div>
  );
};

TimeDisplay.propTypes = {
  open: PropTypes.bool.isRequired,
  openTime: PropTypes.number.isRequired,
  closeTime: PropTypes.number.isRequired,
};

export default TimeDisplay;
