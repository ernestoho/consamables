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
        <div className="scrollable">
          {restaurants.map(result =>
            <RestaurantBox
              key={result.get('restaurantId')}
              {...result.toJS()}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants.toList().sortBy(r => r.get('name'))
});

export default connect(
  mapStateToProps
)(RestaurantPanel);
