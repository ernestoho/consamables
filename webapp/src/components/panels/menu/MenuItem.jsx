import React from 'react';
import { connect } from 'react-redux';

import { addItemToOrder } from '../../../actions'

class MenuItem extends React.Component {
    render() {
        return (
            <div className="menu-item">
                <div className="menu-item-price">
                    ${this.props.price.toFixed(2)}
                </div>
                <div className="menu-item-details">
                    <div className="menu-item-name">{this.props.name}</div>
                    <div className="menu-item-description">{this.props.description}</div>
                </div>
                <div className="menu-item-overlay">
                    <button
                        className="menu-item-button"
                        onClick={() => this.props.onAddClick(this.props.itemId)}
                    >
                        Add to Order
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onAddClick: id => dispatch(addItemToOrder(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuItem)
