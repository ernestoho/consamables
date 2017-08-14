import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderActions } from 'data/currentOrder';

import { SubmitButton } from 'common/components';

const { submitActivatedGroup } = currentOrderActions;

const mapStateToProps = () => ({ text: 'Start Order' });

const mapDispatchToProps = (dispatch, { id }) => ({
  onSubmit: () => dispatch(submitActivatedGroup(id)),
});

const SubmitActivatedGroup = parseId(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitButton));

export default SubmitActivatedGroup;
