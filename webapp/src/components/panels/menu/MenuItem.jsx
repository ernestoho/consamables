import React from 'react';
import { connect } from 'react-redux';

import { addItemToOrder } from '../../../actions'
import { DISPLAY_MENU_ORDERING, DISPLAY_MENU_WITH_ORDER } from '../../../constants';

class MenuItem extends React.Component {
    render() {
        const {
            price, name, description, ordering, itemId,
            onAddClick
        } = this.props;

        return (
            <div className="menu-item">
                {ordering ?
                    <div className="menu-item-overlay">
                        <button
                            className="menu-item-button"
                            onClick={() => onAddClick(itemId)}
                        >
                            Add to Order
                        </button>
                    </div>
                : null}
                <div className="menu-item-info">
                    <div className="menu-item-price">${price.toFixed(2)}</div>
                    <div className="menu-item-name">{name}</div>
                    <div className="menu-item-description">{description}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const display = state.centerColumn.get('display');
    return {
        ordering: (display == DISPLAY_MENU_ORDERING || display == DISPLAY_MENU_WITH_ORDER)
    }
};

const mapDispatchToProps = dispatch => ({
    onAddClick: id => dispatch(addItemToOrder(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuItem)
