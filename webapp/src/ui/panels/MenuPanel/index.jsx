import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { restaurantSelectors } from 'data/restaurants';
import { menuSelectors } from 'data/menus';

import { CloseButton } from 'common/components';
import MenuSection from './MenuSection';

import './styles.scss';

const MenuPanel = ({ name, menu, viewOnly }) => (
  <div className="menu-panel">
    <div className="menu-header">
      <CloseButton />
      <div className="menu-name">{`${name} Menu`}</div>
    </div>
    <div className="scrollable">
      {menu.map(menuSection => (
        <MenuSection viewOnly={viewOnly} key={menuSection.menuSectionId} {...menuSection} />
      ),
      )}
    </div>
  </div>
);

MenuPanel.propTypes = {
  name: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    })).isRequired,
  })).isRequired,
  viewOnly: PropTypes.bool.isRequired,
};

const { getRestaurantName } = restaurantSelectors;
const { getMenu } = menuSelectors;

const mapStateToProps = (state, { id }) => ({
  name: getRestaurantName(state, id),
  menu: getMenu(state, id),
});

export default connect(
  mapStateToProps,
)(toJS(MenuPanel));
