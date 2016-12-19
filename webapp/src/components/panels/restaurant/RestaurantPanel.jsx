import '../../../styles/panels/restaurant-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import PanelHeader from '../PanelHeader';
import RestaurantBox from './RestaurantBox';

class RestaurantPanel extends React.Component {
    render() {
        return (
            <div className="restaurant-panel">
                <PanelHeader name="Restaurants Nearby"></PanelHeader>
                {this.props.restaurants.map(result =>
                    <RestaurantBox key={result.get('restaurantId')} {...result.toJS()}></RestaurantBox>
                )}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({restaurants: state.restaurants.toList()});

export default connect(
    mapStateToProps
)(RestaurantPanel)
