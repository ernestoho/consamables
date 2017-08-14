import { connect } from 'react-redux';

import { suggestedOrderActions } from 'data/suggestedOrder';

import { SubmitButton } from 'common/components';

const { submitVote } = suggestedOrderActions;

const mapStateToProps = () => ({ text: 'Submit Vote' });

const mapDispatchToProps = (dispatch, { id }) => ({
  onSubmit: () => dispatch(submitVote(id)),
});

const SubmitVote = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitButton);

export default SubmitVote;
