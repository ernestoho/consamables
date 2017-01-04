import React from 'react';

import ToppingOption from './ToppingOption';

export default class ToppingsSection extends React.Component {
    render() {
        const { name, toppings } = this.props;
        return (
            <div className="toppings-section">
                <div className="toppings-section-name">{name}</div>
                <div className="toppings-section-list">
                    {toppings.map((topping, i) =>
                        <ToppingOption key={i} name={topping}/>
                    )}
                </div>
            </div>
        );
    }
}
