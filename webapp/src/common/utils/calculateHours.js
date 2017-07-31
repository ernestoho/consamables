import moment from 'moment';
import { Map } from 'immutable';

export default (currentTime, hours) => {
  const now = moment(currentTime);
  const midnight = moment(currentTime).startOf('day');
  const morning = moment(currentTime).hour(5).minute(0);

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const afterMidnight = time => time.isBetween(midnight, morning, null, '[]');
  const toMoment = time => moment(time, 'hh:mma');

  const today = weekdays[now.day()];
  const currentHours = hours[today];
  let [openTime, closeTime] = currentHours.split('-').map(toMoment);

  if (afterMidnight(now)) {
    let yesterday = '';
    if (now.day() === 0) {
      yesterday = weekdays[6];
    } else {
      yesterday = weekdays[now.day() - 1];
    }
    closeTime = toMoment(hours[yesterday].split('-')[1]);

    if (!afterMidnight(closeTime)) {
      closeTime.subtract(1, 'days');
    }

    if (closeTime.isAfter(now)) {
      openTime.subtract(1, 'days');
    }
  } else {
    if (afterMidnight(closeTime)) {
      closeTime.add(1, 'days');
    }

    if (now.isAfter(closeTime)) {
      openTime.add(1, 'days');
    }
  }

  const open = now.isBefore(closeTime) && now.isAfter(openTime);
  openTime = openTime.valueOf();
  closeTime = closeTime.valueOf();

  return Map({ openTime, closeTime, open });
};
