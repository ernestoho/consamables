import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { groupSelectors } from 'data/groups';

import PanelHeader from '../PanelHeader';
import MyOrderPreview from './MyOrderPreview';

import '../../../styles/panels/my-order-summary.scss';

const MyOrderSummary = ({ orders }) => (
  <div className="my-order-summary">
    <PanelHeader name={`My Order${orders.size > 1 ? 's' : ''}`} />
    {orders.map(order => <MyOrderPreview key={order.orderId} {...order} />)}
  </div>
);

MyOrderSummary.propTypes = {
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
)(toJS(MyOrderSummary));
