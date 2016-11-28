import '../styles/column.scss'

import React from 'react';
import Title from './Title';
import Helper from './Helper';
import ActiveOrderPanel from './panels/ActiveOrderPanel';
import PendingOrderPanel from './panels/PendingOrderPanel';
import RestaurantPanel from './panels/RestaurantPanel';
import YourOrderPanel from './panels/YourOrderPanel';
import CredentialsPanel from './panels/CredentialsPanel';

class LeftColumn extends React.Component {
    render() {
        return (
            <div className="column-left">
                <ActiveOrderPanel/>
                <PendingOrderPanel/>
            </div>
        );
    }
}


class CenterColumn extends React.Component {
    render() {
        return (
            <div className="column-center">
                <Title/>
                <YourOrderPanel/>
                <div className="padding"></div>
                <Helper/>
            </div>
        );
    }
}


class RightColumn extends React.Component {
    render() {
        return (
            <div className="column-right">
                <RestaurantPanel/>
                <CredentialsPanel/>
            </div>
        );
    }
}

export { LeftColumn, CenterColumn, RightColumn };
