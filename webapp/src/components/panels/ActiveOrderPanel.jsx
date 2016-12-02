import '../../styles/panels/active-order-panel.scss';

import React from 'react';
import moment from 'moment';
import PanelHeader from './PanelHeader';

export default class ActiveOrderPanel extends React.Component {
    constructor() {
        super();
        this.state = { groups: [] };
    }

    componentDidMount() {
        fetch('/api/groups/active').then(response => {
            response.json().then(json => {
                this.setState({ groups: json });
            });
        });
    }

render() {
        return (
                <div className="active-order-panel">
                    <PanelHeader name="Active Orders"></PanelHeader>
                    {this.state.groups.map(result =>
                        <ActiveOrderBox key={result.groupId} {...result}></ActiveOrderBox>
                    )}
                </div>
        );
    }
}

class ActiveOrderBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: `Restaurant ${props.restaurantId}`
        };
    }

    componentDidMount() {
        fetch('/api/restaurants/' + this.props.restaurantId).then(response => {
            response.json().then(json => {
                this.setState({ restaurantName: json.name });
            });
        });
    }

    render() {
        return (
            <div className="active-order-box">
                <div className="box-title">{this.state.restaurantName}</div>
                <OrderTimer {...this.props}></OrderTimer>
                <div className="toolbar">
                    <button className="button">Join Order</button>
                </div>
            </div>
        );
    }
}


class OrderTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalTime: moment(props.timeStarted).add(props.duration, 'minutes'),
            minutes: 0,
            seconds: 0
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
        const diff = this.state.finalTime.diff( moment() );
        const minutes = Math.floor( (diff / 60000) % 60 );
        const seconds = Math.floor( (diff / 1000) % 60 );
        this.setState({
            minutes: minutes > 0 ? minutes : 0,
            seconds: seconds > 0 ? seconds : 0
        })
    }

    render() {
        let message;
        const style = { };

        if (this.state.minutes < 5) {
            style.color = 'red';
        }

        if (this.state.minutes > 0 && this.state.seconds > 0) {
            const minutes = this.state.minutes.toString();
            const seconds = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds.toString();
            
            message = `${minutes}:${seconds} remaining`;
        } else {
            message = 'Order closed';
        }

        return (
            <div className="order-timer" style={style}>{message}</div>
        );
    }
}
