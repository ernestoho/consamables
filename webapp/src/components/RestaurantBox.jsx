import '../styles/restaurant-box.scss';

import React from 'react';
import moment from 'moment';

export default class RestaurantBox extends React.Component {
    render() {
        return (
            <div className="restaurant-box">
                <div className="restaurant-name">{this.props.name}</div>
                <div className="restaurant-address">
                    {this.props.location.address.street + ', ' + this.props.location.address.city}
                </div>
                <RestaurantLink url={this.props.url}></RestaurantLink>
                <TimeDisplay hours={this.props.hours}></TimeDisplay>
                <RestaurantToolbar/>
            </div>
        )
    }
}


class TimeDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getTimes();
    }

    getTimes() {
        const now = moment();
        const midnight = moment().startOf('day');
        const morning = moment().hour(6).minute(0);
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const earlyMorning = time => time.isBetween(midnight, morning, null, '[]');
        const toMoment = time => moment(time, 'hh:mma');

        const today = weekdays[now.day()];
        const hours = this.props.hours[today];
        let [openTime, closeTime] = hours.split('-').map(toMoment);

        if (earlyMorning(now)) {
            yesterday = weekdays[now.day() - 1];
            closeTime = toMoment(this.props.hours[yesterday].split('-')[1]);
        } else {
            if (earlyMorning(closeTime)) {
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
        if (moment().isBefore(this.state.openTime) && moment().isAfter(this.state.closeTime)) {
            message = `Opening at ${this.state.openTime.format("ddd, hA")}`;
        } else {
            message = `Closing at ${this.state.closeTime.format("ddd, hA")}`;
        }

        return (
            <div className="closing-time-display">{message}</div>
        )
    }
}


class RestaurantLink extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        window.open('http://' + this.props.url);
    }

    render() {
        return (
            <div className="restaurant-url" onClick={this.handleClick}>
                {this.props.url}
            </div>
        )
    }
}


class RestaurantToolbar extends React.Component {
    render() {
        return (
            <div className="restaurant-toolbar">
                <button className="button">View Menu</button>
                <button className="button">Start Order</button>
                <button className="button">Suggest Order</button>
            </div>
        )
    }
}