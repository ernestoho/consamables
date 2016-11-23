import '../styles/restaurant-box.scss';

import React from 'react';

export default class RestaurantBox extends React.Component {
    render() {
        return (
            <div className="restaurant-box">
                <div className="restaurant-name">{this.props.name}</div>
                <div className="restaurant-address">
                    {this.props.location.address.street + ', ' + this.props.location.address.city}
                </div>
                <RestaurantLink url={this.props.url}></RestaurantLink>
                <RestaurantToolbar/>
            </div>
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