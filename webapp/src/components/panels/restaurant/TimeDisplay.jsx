import React from 'react';
import moment from 'moment';

export default class TimeDisplay extends React.Component {
    render() {
        const { open, openTime, closeTime } = this.props;

        let messagePrefix;
        let targetTime;
        let displayTime;
        const style = { };

        const now = moment();

        if (open) {
            targetTime = moment(closeTime);

            if (targetTime.diff(now, 'minutes') < 60) {
                messagePrefix = 'Closing at';
                style.color = 'orange';
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
            <div className="info" style={style}>
                {messagePrefix} {displayTime}
            </div>
        );
    }
}
