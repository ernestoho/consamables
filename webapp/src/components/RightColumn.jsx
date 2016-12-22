import '../styles/column.scss'

import React from 'react';
import { connect } from 'react-redux';

import RestaurantPanel from './panels/restaurant/RestaurantPanel';
import CredentialsPanel from './panels/credentials/CredentialsPanel';

export default class RightColumn extends React.Component {
    render() {
        return (
            <div className="column-right">
                <RestaurantPanel/>
                <CredentialsPanel/>
            </div>
        );
    }
}
