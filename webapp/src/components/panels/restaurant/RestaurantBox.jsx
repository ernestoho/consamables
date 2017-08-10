import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import TimeDisplay from './TimeDisplay';
import RestaurantToolbar from './RestaurantToolbar';

const RestaurantBox = ({ restaurantId, name, location, url, open, openTime, closeTime }) => (
  <div className="restaurant-box">
    <div className="box-title">{name}</div>
    <div className="info">
      {location.address.street}, {location.address.city}
    </div>
    <Link url={url} />
    <TimeDisplay open={open} openTime={openTime} closeTime={closeTime} />
    <RestaurantToolbar id={restaurantId} open={open} />
  </div>
);

RestaurantBox.propTypes = {
  restaurantId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  openTime: PropTypes.number.isRequired,
  closeTime: PropTypes.number.isRequired,
};

export default RestaurantBox;
