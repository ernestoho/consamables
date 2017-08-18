import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentOrderActions } from 'data/currentOrder';
import { pizzaBuilderActions } from 'data/pizzaBuilder';

function MenuItem({
  price, name, description, viewOnly, itemId, data,
  onAddClick, onBuildClick,
}) {
  const pizza = data && 'pizza' in data;
  const onClick = pizza ? onBuildClick : onAddClick;

  return (
    <div
      className={`menu-item${!viewOnly ? ' order' : ''}`}
      onClick={!viewOnly ? () => onClick(itemId) : null}
    >
      <div className="menu-item-info">
        <div className="menu-item-name">{name}</div>
        <div className="menu-item-description">{description}</div>
      </div>
      <div className="menu-item-action">
        <div className="menu-item-price">${price.toFixed(2)}</div>
        {!viewOnly ?
          <div className="menu-item-click-label-container">
            <div className="menu-item-click-label">
              {pizza ? 'Build' : 'Add'}
            </div>
          </div>
          : null}
      </div>
    </div>
  );
}

const { addItemToOrder } = currentOrderActions;
const { openPizzaBuilder } = pizzaBuilderActions;

MenuItem.propTypes = {
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  viewOnly: PropTypes.bool.isRequired,
  itemId: PropTypes.number.isRequired,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onAddClick: PropTypes.func.isRequired,
  onBuildClick: PropTypes.func.isRequired,
};

MenuItem.defaultProps = { data: null, description: '' };

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onAddClick: id => dispatch(addItemToOrder(id)),
  onBuildClick: id => dispatch(openPizzaBuilder(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuItem);
