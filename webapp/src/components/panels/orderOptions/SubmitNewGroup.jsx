import { connect } from 'react-redux';

import SubmitButton from '../SubmitButton';
import { getGroupRestaurantId } from '../../../selectors';
import { submitNewGroup } from '../../../actions';

const mapStateToProps = (state, ownProps) => ({
    text: 'Start Order',
    data: {
        activeGroup: {
            restaurantId: parseInt(ownProps.id),
            type: state.centerColumn.currentOrder.getIn(['options', 'type']),
            durationMinutes: state.centerColumn.currentOrder.getIn(['options', 'duration']),
            organizerId: state.currentUser.get('userId'),
            overheadPercentage: state.centerColumn.currentOrder.getIn(['options', 'overhead']) * 0.01
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
