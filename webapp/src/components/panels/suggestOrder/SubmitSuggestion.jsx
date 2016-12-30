import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { submitSuggestion } from '../../../actions';
import { buildOrderType } from '../../../helpers';

const mapStateToProps = state => ({
    text: 'Submit Suggestion',
    data: {
        pendingGroup: {
            restaurantId: state.centerColumn.suggestOrder.get('restaurantId'),
            type: buildOrderType(state.centerColumn.suggestOrder.get('orderType')),
            minPeople: state.centerColumn.suggestOrder.get('minPeople') + 1
        },
        vote: {
            userId: state.currentUser.get('userId'),
            minutesInterested: state.centerColumn.suggestOrder.get('waitTime'),
            canDrive: state.centerColumn.suggestOrder.get('driving')
        }
    }
});

const mapDispatchToProps = dispatch => ({
    submit: data => dispatch(submitSuggestion(data))
});

const SubmitSuggestion = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitButton)

export default SubmitSuggestion
