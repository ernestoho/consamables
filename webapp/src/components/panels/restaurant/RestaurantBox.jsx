import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TimeDisplay from './TimeDisplay';
import Link from '../Link';
import { showMenu, startOrder } from '../../../actions';

class RestaurantBox extends React.Component {
    render() {
        const {
            restaurantId, name, location, url, open, openTime, closeTime,
            onMenuClick, onStartClick
        } = this.props;

        return (
            <div className="restaurant-box">
                <div className="box-title">{name}</div>
                <div className="info">
                    {location.address.street}, {location.address.city}
                </div>
                <Link url={url}/>
                <TimeDisplay open={open} openTime={openTime} closeTime={closeTime}/>
                <RestaurantToolbar
                    onMenuClick={() => onMenuClick(restaurantId)}
                    onStartClick={() => onStartClick(restaurantId)}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onMenuClick: (id) => dispatch(showMenu(id)),
    onStartClick: (id) => dispatch(startOrder(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantBox)
