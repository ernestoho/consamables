import React from 'react';
import { connect } from 'react-redux';

import ToppingSideButton from './ToppingSideButton';
import { toggleTopping } from '../../../actions';

class ToppingOption extends React.Component {
    render() {
        const {
            name, selected, side,
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
                {selected ?
                    <div className="topping-select">
                        <ToppingSideButton name={name} side="left" icon="◐"/>
                        <ToppingSideButton name={name} side="whole" icon="◉"/>
                        <ToppingSideButton name={name} side="right" icon="◑"/>
                    </div>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    selected: state.centerColumn.pizzaBuilder.hasIn(['toppings', ownProps.name])
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggle: () => dispatch(toggleTopping(ownProps.name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToppingOption)
