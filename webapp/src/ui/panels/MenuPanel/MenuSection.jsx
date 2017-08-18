import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';

const MenuSection = ({ name, items, viewOnly }) => (
  <div className="menu-section">
    <div className="menu-section-name">{name}</div>
    {items.map(item => <MenuItem key={item.name} {...item} viewOnly={viewOnly} />)}
  </div>
);

MenuSection.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  viewOnly: PropTypes.bool.isRequired,
};

export default MenuSection;
