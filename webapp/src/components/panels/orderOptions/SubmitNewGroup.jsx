import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { submitNewGroup } from '../../../actions';

const mapStateToProps = state => ({
    text: 'Start Order',
    data: {
        activeGroup: {
            restaurantId: state.centerColumn.currentOrder.get('restaurantId'),
            type: state.centerColumn.currentOrder.getIn(['options', 'type']),
            durationMinutes: state.centerColumn.currentOrder.getIn(['options', 'duration']),
            organizerId: state.currentUser.get('userId'),
            overheadPercentage: state.centerColumn.currentOrder.getIn(['options', 'overhead'])
        },
        order: {
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
    submit: data => dispatch(submitNewGroup(data))
});

const SubmitNewGroup = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitButton);

export default SubmitNewGroup
