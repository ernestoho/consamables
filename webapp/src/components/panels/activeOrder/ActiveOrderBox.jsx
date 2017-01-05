import React from 'react';
import { connect } from 'react-redux';

import OrderTimer from '../OrderTimer';
import { joinOrder } from '../../../actions';

class ActiveOrderBox extends React.Component {
    render() {
        const {
            loggedIn, restaurantName, timeStarted, durationMinutes,
            joinOrder
        } = this.props;

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
    }
}

const mapStateToProps = state => ({
    loggedIn: state.currentUser.get('loggedIn')
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    joinOrder: () => dispatch(joinOrder(ownProps.restaurantId, ownProps.groupId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveOrderBox)
