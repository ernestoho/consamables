import React from 'react';
import { connect } from 'react-redux';

import { addItemToOrder, openPizzaBuilder } from '../../../actions';
import { DISPLAY_MENU_ORDERING, DISPLAY_MENU_WITH_ORDER } from '../../../constants';

class MenuItem extends React.Component {
  render() {
    const {
      price, name, description, viewOnly, itemId, data,
      onAddClick, onBuildClick
    } = this.props;

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
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onAddClick: id => dispatch(addItemToOrder(id)),
  onBuildClick: id => dispatch(openPizzaBuilder(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);
