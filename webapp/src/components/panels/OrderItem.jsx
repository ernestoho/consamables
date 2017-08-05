import React from 'react';
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

const PizzaDetails = ({ toppings, sauce, cheese, size }) => (
  <div className="item-data pizza">
    {toppings.size > 0 ?
      <div className="toppings">
        {size === 'half' ?
          toppings.map(topping =>
            <div className="topping" key={topping}>{topping}</div>
          )
          : toppings.map((side, topping) =>
            <div className="topping" key={topping}>{topping} ({side})</div>
          ).toList()}
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

const OrderItemData = ({ data }) => {
  if (data.pizza) {
    return <PizzaDetails {...data.pizza} />;
  }
  return (
    <div className="item-data" />
  );
};

const { getItemName } = itemSelectors;

const mapStateToProps = (state, { itemId }) => ({
  name: getItemName(state, itemId),
});

export default connect(
  mapStateToProps,
)(toJS(OrderItem));
