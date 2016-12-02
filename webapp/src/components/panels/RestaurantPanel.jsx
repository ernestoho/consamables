import '../../styles/panels/restaurant-panel.scss';

import React from 'react';
import moment from 'moment';
import PanelHeader from './PanelHeader';

export default class RestaurantPanel extends React.Component {
    constructor() {
        super();
        this.state = { restaurants: [] };
    }

    componentDidMount() {
        fetch('/api/restaurants').then(response => {
            response.json().then(json => {
                this.setState({ restaurants: json });
            });
        });
    }

    render() {
        return (
            <div className="restaurant-panel">
                <PanelHeader name="Restaurants Nearby"></PanelHeader>
                {this.state.restaurants.map(result => 
                    <RestaurantBox key={result.restaurantId} {...result}></RestaurantBox>
                )}
            </div>
        );
    }
}


class RestaurantBox extends React.Component {
    render() {
        return (
            <div className="restaurant-box">
                <div className="box-title">{this.props.name}</div>
                <div className="info">
                    {this.props.location.address.street + ', ' + this.props.location.address.city}
                </div>
                <RestaurantLink url={this.props.url}></RestaurantLink>
                <TimeDisplay hours={this.props.hours}></TimeDisplay>
                <RestaurantToolbar/>
            </div>
        );
    }
}


class TimeDisplay extends React.Component {
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
            <div className="link" onClick={this.handleClick}>
                {this.props.url}
            </div>
        );
    }
}


class RestaurantToolbar extends React.Component {
    render() {
        return (
            <div className="toolbar">
                <button className="button">View Menu</button>
                <button className="button">Start Order</button>
                <button className="button">Suggest Order</button>
            </div>
        );
    }
}
