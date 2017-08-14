import { connect } from 'react-redux';

import { suggestedOrderActions } from 'data/suggestedOrder';

import { SubmitButton } from 'common/components';

const { submitSuggestion } = suggestedOrderActions;

const mapStateToProps = () => ({ text: 'Submit Suggestion' });

const mapDispatchToProps = (dispatch, { id }) => ({
  onSubmit: () => dispatch(submitSuggestion(id)),
});

const SubmitSuggestion = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitButton);

export default SubmitSuggestion;
