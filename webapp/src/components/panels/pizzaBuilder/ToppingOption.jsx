import React from 'react';
import { connect } from 'react-redux';

import { toggleTopping, changeToppingSide } from '../../../actions';

class ToppingOption extends React.Component {
    render() {
        const {
            name, selected,
            toggle, changeSide
        } = this.props;

        return (
            <div className="topping-option">
                <div
                    className={selected ? 'topping-name-selected' : 'topping-name'}
                    onClick={toggle}
                >
                    {name}
                </div>
                <div className="topping-select">
                    <div className="topping-left"></div>
                    <div className="topping-whole"></div>
                    <div className="topping-right"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    selected: state.centerColumn.pizzaBuilder.hasIn(['toppings', ownProps.name]),
    side: state.centerColumn.pizzaBuilder.getIn(['toppings', ownProps.name])
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggle: () => dispatch(toggleTopping(ownProps.name)),
    changeSide: side => dispatch(changeToppingSide(ownProps.name, side))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToppingOption)
