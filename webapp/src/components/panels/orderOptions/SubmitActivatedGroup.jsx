import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { submitActivatedGroup } from '../../../actions';

const mapStateToProps = state => ({
    text: 'Start Order',
    data: {
        activeGroup: {
            groupId: state.centerColumn.currentOrder.get('groupId'),
            type: state.centerColumn.currentOrder.getIn(['options', 'type']),
            durationMinutes: state.centerColumn.currentOrder.getIn(['options', 'duration']),
            organizerId: state.currentUser.get('userId')
        },
        order: {
            groupId: state.centerColumn.currentOrder.get('groupId'),
            userId: state.currentUser.get('userId'),
            orderItems: state.centerColumn.currentOrder.get('items')
                .map((item, itemId) => ({
                    itemId,
                    quantity: item.get('quantity'),
                    data: item.get('data')
                }))
                .toList().toJS()
        }
    }
});

const mapDispatchToProps = dispatch => ({
    submit: data => dispatch(submitActivatedGroup(data))
});

const SubmitActivatedGroup = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitButton);

export default SubmitActivatedGroup
