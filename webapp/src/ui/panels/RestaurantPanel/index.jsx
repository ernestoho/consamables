import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { restaurantSelectors } from 'data/restaurants';

import { PanelHeader } from 'common/components';
import RestaurantBox from './RestaurantBox';

import './styles.scss';

const RestaurantPanel = ({ restaurants }) => (
  <div className="restaurant-panel">
    <PanelHeader name="Restaurants Nearby" />
    <div className="scrollable">
      {restaurants.map(result => <RestaurantBox key={result.restaurantId} {...result} />)}
    </div>
  </div>
);

RestaurantPanel.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.shape({
    restaurantId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const { getRestaurants } = restaurantSelectors;

const mapStateToProps = state => ({
  restaurants: getRestaurants(state),
});

export default connect(
  mapStateToProps,
)(toJS(RestaurantPanel));
