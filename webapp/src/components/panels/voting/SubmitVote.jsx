import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { submitVote } from '../../../actions';

const mapStateToProps = (state, ownProps) => ({
  text: 'Submit Vote',
  data: {
    groupId: ownProps.id,
    userId: state.currentUser.get('userId'),
    minutesInterested: state.centerColumn.vote.get('waitTime'),
    canDrive: state.centerColumn.vote.get('driving')
  },
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(submitVote(data))
});

const SubmitVote = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitButton);

export default SubmitVote;
