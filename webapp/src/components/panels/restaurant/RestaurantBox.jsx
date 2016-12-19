import React from 'react';
import moment from 'moment';

import TimeDisplay from './TimeDisplay';
import Link from '../Link';

export default class RestaurantBox extends React.Component {
    render() {
        return (
            <div className="restaurant-box">
                <div className="box-title">{this.props.name}</div>
                <div className="info">
                    {`${this.props.location.address.street}, ${this.props.location.address.city}`}
                </div>
                <Link url={this.props.url}></Link>
                <TimeDisplay hours={this.props.hours}></TimeDisplay>
                <RestaurantToolbar/>
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