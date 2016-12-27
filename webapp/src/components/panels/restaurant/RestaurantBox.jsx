import React from 'react';
import { connect } from 'react-redux';

import Link from '../Link';
import TimeDisplay from './TimeDisplay';
import RestaurantToolbar from './RestaurantToolbar';
import { showMenu, startOrder, suggestOrder } from '../../../actions';

class RestaurantBox extends React.Component {
    render() {
        const {
            restaurantId, name, location, url, open, openTime, closeTime,
            onMenuClick, onStartClick, onSuggestClick
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
                    open={open}
                    onMenuClick={() => onMenuClick(restaurantId)}
                    onStartClick={() => onStartClick(restaurantId)}
                    onSuggestClick={() => onSuggestClick(restaurantId)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onMenuClick: (id) => dispatch(showMenu(id)),
    onStartClick: (id) => dispatch(startOrder(id)),
    onSuggestClick: (id) => dispatch(suggestOrder(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantBox)
