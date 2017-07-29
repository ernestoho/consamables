import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { submitNewOrder } from '../../../actions';

const mapStateToProps = (state, ownProps) => ({
  text: 'Join Order',
  data: {
    userId: state.currentUser.get('userId'),
    groupId: ownProps.id,
    orderItems: state.centerColumn.currentOrder.get('items')
      .map(item => ({
        itemId: item.get('id'),
        quantity: item.get('quantity'),
        data: item.get('data')
      }))
      .toList().toJS()
  }
});

const mapDispatchToProps = dispatch => ({
  submit: data => dispatch(submitNewOrder(data))
});

const SubmitNewOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitButton);

export default SubmitNewOrder;
