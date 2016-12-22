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
                <Link url={this.props.url}/>
                <TimeDisplay hours={this.props.hours}/>
                <RestaurantToolbar
                    onMenuClick={this.props.onMenuClick}
                    onStartClick={this.props.onStartClick}
                />
            </div>
        );
    }
}


class RestaurantToolbar extends React.Component {
    render() {
        return (
            <div className="toolbar">
                <button className="button" onClick={this.props.onMenuClick}>
                    View Menu
                </button>
                <button className="button" onClick={this.props.onStartClick}>
                    Start Order
                </button>
                <button className="button">
                    Suggest Order
                </button>
            </div>
        );
    }
}
