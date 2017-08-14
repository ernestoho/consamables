import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderActions } from 'data/currentOrder';

import { SubmitButton } from 'common/components';

const mapStateToProps = () => ({ text: 'Start Order' });

const { submitNewGroup } = currentOrderActions;

const mapDispatchToProps = (dispatch, { id }) => ({
  onSubmit: () => dispatch(submitNewGroup(id)),
});

const SubmitNewGroup = parseId(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitButton));

export default SubmitNewGroup;
