import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { toJS } from 'common/utils';

import { itemSelectors } from 'data/items';

const OrderItem = ({ name, quantity, data }) => {
  const pizzaSize = data && data.pizza ? data.pizza.size : null;
  return (
    <div className="order-item">
      <div className="order-item-name">
        {quantity > 1 && `${quantity} × `}
        {name}
        {pizzaSize && ` (${_.startCase(pizzaSize)})`}
      </div>
      {data && <OrderItemData data={data} />}
    </div>
  );
};

OrderItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  data: PropTypes.shape({
    pizza: PropTypes.shape({
      toppings: PropTypes.objectOf(PropTypes.string),
      sauce: PropTypes.string.isRequired,
      cheese: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    }),
  }),
};

OrderItem.defaultProps = { data: null };

const PizzaDetails = ({ toppings, sauce, cheese, size }) => (
  <div className="item-data pizza">
    {toppings.size > 0 ?
      <div className="toppings">
        {size === 'half' ?
          toppings.map(topping => <div className="topping" key={topping}>{topping}</div>)
          : _.toPairs(toppings).map(([topping, side]) => (
            <div className="topping" key={topping}>{topping} ({side})</div>
          ))}
      </div>
      : null}
    {cheese || sauce ?
      <div className="other">
        <div>{cheese}</div>
        <div>{sauce}</div>
      </div>
      : null}
  </div>
);

PizzaDetails.propTypes = {
  toppings: PropTypes.objectOf(PropTypes.string).isRequired,
  sauce: PropTypes.string.isRequired,
  cheese: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

const OrderItemData = ({ data }) => {
  if (data.pizza) {
    return <PizzaDetails {...data.pizza} />;
  }
  return (
    <div className="item-data" />
  );
};

// eslint-disable-next-line react/forbid-prop-types
OrderItemData.propTypes = { data: PropTypes.object.isRequired };

const { getItemName } = itemSelectors;

const mapStateToProps = (state, { itemId }) => ({
  name: getItemName(state, itemId),
});

export default connect(
  mapStateToProps,
)(toJS(OrderItem));
