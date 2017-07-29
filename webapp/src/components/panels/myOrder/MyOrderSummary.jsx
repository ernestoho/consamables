import '../../../styles/panels/my-order-summary.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import MyOrderPreview from './MyOrderPreview';
import { getGroupRestaurant } from '../../../selectors';

class MyOrderSummary extends React.Component {
  render() {
    const { orders } = this.props;

    return (
      <div className="my-order-summary">
        <PanelHeader name={`My Order${orders.size > 1 ? 's' : ''}`}/>
        {orders.map(order =>
          <MyOrderPreview key={order.get('id')}
            {...order.toObject()}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.myOrders.map(
    (order, id) => order.set('id', id).set('restaurantName',
      getGroupRestaurant(state, order.get('groupId'))
    )
  ).toList()
});

export default connect(
  mapStateToProps
)(MyOrderSummary);
