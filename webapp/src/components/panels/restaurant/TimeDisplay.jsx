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
        let message = '';
        const style = { };
        const now = moment();
        if (now.isAfter(this.state.closeTime)) {
            if (now.day() !== this.state.openTime.day()) {
                message = `Opening tomorrow at ${this.state.openTime.format("hA")}`;
            } else {
                message = `Opening at ${this.state.openTime.format("hA")}`;
            }
            style.color = 'red';
        } else {
            if (this.state.closeTime.diff(now, 'minutes') < 60) {
                message = `Closing at ${this.state.closeTime.format("hA")}`;
                style.color = 'orange';
            } else {
                message = `Open until ${this.state.closeTime.format("hA")}`;
                style.color = 'green';
            }
        }

        return (
            <div className="info" style={style}>{message}</div>
        );
    }
}