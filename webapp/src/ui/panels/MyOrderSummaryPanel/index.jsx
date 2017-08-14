import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { groupSelectors } from 'data/groups';

import { PanelHeader } from 'common/components';
import MyOrderPreview from './MyOrderPreview';

import './styles.scss';

const MyOrderSummaryPanel = ({ orders }) => (
  <div className="my-order-summary-panel">
    <PanelHeader name={`My Order${orders.size > 1 ? 's' : ''}`} />
    {orders.map(order => <MyOrderPreview key={order.orderId} {...order} />)}
  </div>
);

MyOrderSummaryPanel.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    orderId: PropTypes.number.isRequired,
  })).isRequired,
};

const { getMyOrders } = groupSelectors;

const mapStateToProps = state => ({
  orders: getMyOrders(state),
});

export default connect(
  mapStateToProps,
)(toJS(MyOrderSummaryPanel));
