import React from 'react';
import { connect } from 'react-redux';

class SideToppings extends React.Component {
    render() {
        const { side, toppings } = this.props;

        return (
            <div className="side-toppings">
                <div className="side-label">{side.charAt(0).toUpperCase() + side.slice(1)}</div>
                <div className="side-list">
                    {toppings.map((topping, i) =>
                        <div className="side-topping" key={i}>{topping}</div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    toppings: state.centerColumn.pizzaBuilder.get('toppings').filter(
        side => side == ownProps.side
    ).keySeq()
});

export default connect(
    mapStateToProps
)(SideToppings)
