import React from 'react';
import moment from 'moment';

import TimeDisplay from './TimeDisplay';
import Link from '../Link';

export default class RestaurantBox extends React.Component {
    render() {
        const {
            name, location, url, open, openTime, closeTime,
            onMenuClick, onStartClick
        } = this.props;

        return (
            <div className="restaurant-box">
                <div className="box-title">{name}</div>
                <div className="info">
                    {`${location.address.street}, ${location.address.city}`}
                </div>
                <Link url={url}/>
                <TimeDisplay open={open} openTime={openTime} closeTime={closeTime}/>
                <RestaurantToolbar
                    onMenuClick={onMenuClick}
                    onStartClick={onStartClick}
                />
            </div>
        );
    }
}


class RestaurantToolbar extends React.Component {
    render() {
        const { onMenuClick, onStartClick } = this.props;

        return (
            <div className="toolbar">
                <button className="button" onClick={onMenuClick}>
                    View Menu
                </button>
                <button className="button" onClick={onStartClick}>
                    Start Order
                </button>
                <button className="button">
                    Suggest Order
                </button>
            </div>
        );
    }
}
