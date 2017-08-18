import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { currentOrderSelectors, currentOrderActions } from 'data/currentOrder';

import { PanelHeader } from 'common/components';
import OrderItem from './OrderItem';

import './styles.scss';

function CurrentOrderPanel({
  orderStarted, items, stage, orderTotal,
  onContinueClick, onBackClick,
}) {
  if (orderStarted) {
    return (
      <div className="current-order-panel">
        <PanelHeader name="Your Order" />
        <div className="scrollable">
          {items.map((item, index) => <OrderItem key={item.id} index={index} {...item} />)}
        </div>
        <div className="continue">
          {stage === 'choose' ?
            <button className="button" onClick={onContinueClick}>Continue</button>
            :
            <button className="button" onClick={onBackClick}>Return to Menu</button>}
          <div className="order-total">Total: ${orderTotal.toFixed(2)}</div>
        </div>
      </div>
    );
  }
  return null;
}

CurrentOrderPanel.propTypes = {
  orderStarted: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  stage: PropTypes.string.isRequired,
  orderTotal: PropTypes.number.isRequired,
  onContinueClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

const { isOrderStarted, getOrderItems, getOrderTotal, getOrderStage } = currentOrderSelectors;
const { continueOrder, goBackToMenu } = currentOrderActions;

const mapStateToProps = state => ({
  orderStarted: isOrderStarted(state),
  items: getOrderItems(state),
  orderTotal: getOrderTotal(state),
  stage: getOrderStage(state),
});

const mapDispatchToProps = dispatch => ({
  onContinueClick: () => dispatch(continueOrder()),
  onBackClick: () => dispatch(goBackToMenu()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(CurrentOrderPanel));
