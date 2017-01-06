import React from 'react';
import { connect } from 'react-redux';

import OrderItem from './OrderItem';

class IndividualOrder extends React.Component {
    render() {
        const { username, isCurrentUser, orderItems } = this.props;
        return (
            <div className="individual-order">
                <div className="username">
                    {username.split('@')[0]}<wbr/>{'@' + username.split('@')[1]}
                    {isCurrentUser ? ' (you)' : null}
                </div>
                <div className="order-items">
                    {orderItems.map(orderItem =>
                        <OrderItem key={orderItem.get('orderItemId')}{...orderItem.toObject()}/>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    isCurrentUser: state.currentUser.get('username') == ownProps.username
});

export default connect(
    mapStateToProps
)(IndividualOrder)
