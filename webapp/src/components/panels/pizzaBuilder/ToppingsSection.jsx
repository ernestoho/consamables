import React from 'react';
import PropTypes from 'prop-types';

import ToppingOption from './ToppingOption';

const ToppingsSection = ({ name, toppings }) => (
  <div className="toppings-section">
    <div className="toppings-section-name">{name}</div>
    <div className="toppings-section-list">
      {toppings ?
        toppings.map(topping => <ToppingOption key={topping} name={topping} />)
        : null}
    </div>
  </div>
);

ToppingsSection.propTypes = {
  name: PropTypes.string.isRequired,
  toppings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ToppingsSection;
