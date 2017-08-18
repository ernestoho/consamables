import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderSelectors } from 'data/currentOrder';

import { PanelHeader, Spinner } from 'common/components';
import SubmitNewOrder from './SubmitNewOrder';

import './styles.scss';

const NewOrderConfirmPanel = ({ loading, orderTotal, id }) => (
  <div className="new-order-confirm-panel">
    <PanelHeader name="Confirm Order" />
    <div className="confirm-message">
      Are you sure you want to add your order to this group?
    </div>
    <div className="confirm-message">
      You&apos;ll be charged
      <span className="order-total"> ${orderTotal} </span>
      on Splitwise.
    </div>
    <div className="reminder-text">
      (This includes overhead for tax, delivery, etc.)
    </div>
    {loading ?
      <Spinner />
      : <SubmitNewOrder id={id} />}
  </div>
);

NewOrderConfirmPanel.propTypes = {
  loading: PropTypes.bool.isRequired,
  orderTotal: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

const { isLoading, getAdjustedOrderTotal } = currentOrderSelectors;

const mapStateToProps = (state, { id }) => ({
  loading: isLoading(state),
  orderTotal: getAdjustedOrderTotal(state, id),
});

export default parseId(connect(
  mapStateToProps,
)(NewOrderConfirmPanel));
