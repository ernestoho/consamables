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
        const hours = Math.floor( (diff / 3600000) % 60 );
        const minutes = Math.floor( (diff / 60000) % 60 );
        const seconds = Math.floor( (diff / 1000) % 60 );
        this.setState({
            hours: hours > 0 ? hours : 0,
            minutes: minutes > 0 ? minutes : 0,
            seconds: seconds > 0 ? seconds : 0
        })
    }

    render() {
        let message;
        const style = { };
        const { concise } = this.props;

        if (this.state.minutes < 5 && this.state.hours == 0) {
            style.color = 'red';
        } else if (concise) {
            style.color = 'green';
        }

        if (this.state.minutes > 0 || this.state.seconds > 0 || this.state.hours > 0) {
            const hours = this.state.hours > 0 ? `${this.state.hours}:` : '';
            const minutes = this.state.hours > 0 && this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes.toString();
            const seconds = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds.toString();
            
            message = `${hours}${minutes}:${seconds}`;
            if (!concise) {
                message += ' remaining';
            }
        } else {
            message = 'Order closed';
        }

        return (
            <div className="order-timer" style={style}>{message}</div>
        );
    }
}
