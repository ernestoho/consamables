import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import OrderTimer from '../OrderTimer';

export default function OrganizedOrderPreview({
  groupId, restaurantName, type,
  timeStarted, durationMinutes,
}) {
  return (
    <div className="organized-order-preview">
      <div className="description">
        <div className="restaurant-name">{restaurantName}</div>
        <div className="type">{type.charAt(0).toUpperCase()}{type.slice(1)}</div>
      </div>
      <OrderTimer timeStarted={timeStarted} duration={durationMinutes} concise />
      <Link to={`/group-details/${groupId}`} className="button">View Details</Link>
    </div>
  );
}

OrganizedOrderPreview.propTypes = {
  groupId: PropTypes.number.isRequired,
  restaurantName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  timeStarted: PropTypes.number.isRequired,
  durationMinutes: PropTypes.number.isRequired,
};
