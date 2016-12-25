import React from 'react';
import { connect } from 'react-redux';

import { getItemName, getItemPrice } from '../../../selectors';

class OrderItem extends React.Component {
    render() {
        return (
            <div className="order-item">
                {this.props.name}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    name: getItemName(state, ownProps.id),
    price: getItemPrice(state, ownProps.id)
});

export default connect(
    mapStateToProps
)(OrderItem)
