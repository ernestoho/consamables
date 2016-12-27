import '../../../styles/panels/restaurant-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import PanelHeader from '../PanelHeader';
import RestaurantBox from './RestaurantBox';

class RestaurantPanel extends React.Component {
    render() {
        const {
            restaurants,
            onMenuClick, onStartClick
        } = this.props;

        return (
            <div className="restaurant-panel">
                <PanelHeader name="Restaurants Nearby"></PanelHeader>
                {restaurants.map(result =>
                    <RestaurantBox
                        key={result.get('restaurantId')}
                        {...result.toJS()}
                        onMenuClick={() => onMenuClick(result.get('restaurantId'))}
                        onStartClick={onStartClick}
                    />
                )}
            </div>
        );
    }
}


const mapStateToProps = state => ({restaurants: state.restaurants.toList()});

export default connect(
    mapStateToProps
)(RestaurantPanel)
