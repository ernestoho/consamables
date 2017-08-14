import React from 'react';
import PropTypes from 'prop-types';

import { Link, Spinner } from 'common/components';
import TimeDisplay from './TimeDisplay';
import RestaurantToolbar from './RestaurantToolbar';

const RestaurantBox = ({ restaurantId, name, location, url, open, openTime, closeTime }) => (
  <div className="restaurant-box">
    <div className="box-title">{name}</div>
    <div className="info">
      {location.address.street}, {location.address.city}
    </div>
    <Link url={url} />
    {openTime && closeTime ?
      <TimeDisplay open={open} openTime={openTime} closeTime={closeTime} />
      : <Spinner />
    }
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
  open: PropTypes.bool,
  openTime: PropTypes.number,
  closeTime: PropTypes.number,
};

RestaurantBox.defaultProps = {
  open: false,
  openTime: null,
  closeTime: null,
};

export default RestaurantBox;
