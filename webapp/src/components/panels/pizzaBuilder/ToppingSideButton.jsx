import React from 'react';
import { connect } from 'react-redux';

import { changeToppingSide } from '../../../actions';

class ToppingSideButton extends React.Component {
    render() {
        const { selected, icon, changeSide } = this.props;

        return (
            <div
                className={`topping-side${selected ? ' selected' : ''}`}
                onClick={changeSide}
            >
                {icon}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    selected: state.centerColumn.pizzaBuilder.getIn(['toppings', ownProps.name]) == ownProps.side
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeSide: () => dispatch(changeToppingSide(ownProps.name, ownProps.side))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToppingSideButton)
