import React from 'react';
import moment from 'moment';

export default class TimeDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getTimes();
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.setState(this.getTimes()),
            60000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getTimes() {
        const now = moment();
        const midnight = moment().startOf('day');
        const morning = moment().hour(6).minute(0);
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const afterMidnight = time => time.isBetween(midnight, morning, null, '[]');
        const toMoment = time => moment(time, 'hh:mma');

        const today = weekdays[now.day()];
        const hours = this.props.hours[today];
        let [openTime, closeTime] = hours.split('-').map(toMoment);

        if (afterMidnight(now)) {
            let yesterday = '';
            if (now.day() === 0) {
                yesterday = weekdays[6];
            } else {
                yesterday = weekdays[now.day() - 1];
            }
            closeTime = toMoment(this.props.hours[yesterday].split('-')[1]);

            if (!afterMidnight(closeTime)) {
                closeTime.subtract(1, 'days');
            }

        } else {
            if (afterMidnight(closeTime)) {
                closeTime.add(1, 'days');
            }

            if (now.isAfter(closeTime)) {
                openTime.add(1, 'days');
            }
        }

        return {
            openTime: openTime,
            closeTime: closeTime
        };
    }

    render() {
        let messagePrefix;
        let targetTime;
        const style = { };
        const now = moment();
        if (now.isAfter(this.state.closeTime)) {

            targetTime = this.state.openTime;

            if (now.day() !== targetTime.day()) {
                messagePrefix = 'Opening tomorrow at';
            } else {
                messagePrefix = 'Opening at';
            }
            style.color = 'red';

        } else {

            targetTime = this.state.closeTime;

            if (targetTime.diff(now, 'minutes') < 60) {
                messagePrefix = 'Closing at';
                style.color = 'orange';
            } else {
                messagePrefix = 'Open until';
                style.color = 'green';
            }
        }

        let displayTime;

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
