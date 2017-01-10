import React from 'react';
import { Link } from 'react-router';

import OrderTimer from '../OrderTimer';

export default class OrganizedOrderPreview extends React.Component {
    render() {
        const {
            id, restaurantName, type, timeStarted, duration,
            onClick
        } = this.props;

        return (
            <div className="organized-order-preview">
                <div className="description">
                    <div className="restaurant-name">{restaurantName}</div>
                    <div className="type">{type.charAt(0).toUpperCase()}{type.slice(1)}</div>
                </div>
                <OrderTimer timeStarted={timeStarted} duration={duration} concise={true}/>
                <Link to={`/group-details/${id}`} className="button">View Details</Link>
            </div>
        );
    }
}
