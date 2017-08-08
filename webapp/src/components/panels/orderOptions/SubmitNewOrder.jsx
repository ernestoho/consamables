import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderActions } from 'data/currentOrder';

import SubmitButton from '../SubmitButton';

const mapStateToProps = () => ({ text: 'Join Order' });

const { submitNewOrder } = currentOrderActions;

const mapDispatchToProps = (dispatch, { id }) => ({
  onSubmit: () => dispatch(submitNewOrder(id)),
});

const SubmitNewOrder = parseId(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitButton));

export default SubmitNewOrder;
