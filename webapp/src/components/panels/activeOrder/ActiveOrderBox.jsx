import React from 'react';
import { connect } from 'react-redux';

import OrderTimer from '../OrderTimer';
import { joinOrder } from '../../../actions';

class ActiveOrderBox extends React.Component {
    render() {
        const {
            visible, loggedIn, restaurantName, timeStarted, durationMinutes,
            joinOrder
        } = this.props;

        if (visible) {
            return (
                <div className="active-order-box">
                    <div className="box-title">{restaurantName}</div>
                    <OrderTimer timeStarted={timeStarted} duration={durationMinutes}/>
                    {loggedIn ?
                        <div className="toolbar">
                            <button className="button" onClick={joinOrder}>Join Order</button>
                        </div>
                        : null}
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.currentUser.get('loggedIn'),
    visible: !state.organizedOrders.has(ownProps.groupId)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    joinOrder: () => dispatch(joinOrder(ownProps.restaurantId, ownProps.groupId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveOrderBox)
