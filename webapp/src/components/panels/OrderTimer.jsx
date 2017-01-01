import React from 'react';
import moment from 'moment';

export default class OrderTimer extends React.Component {
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

        if (this.state.minutes > 0 || this.state.seconds > 0) {
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
