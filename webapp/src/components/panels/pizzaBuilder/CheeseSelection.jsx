import React from 'react';
import { connect } from 'react-redux';

import { changeCheese } from '../../../actions';

class CheeseSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }

    setValue(value) {
        this.setState({ expanded: false });
        this.props.changeValue(value);
    }

    render() {
        const { options, currentValue } = this.props;
        const { expanded } = this.state;

        return (
            <div className="pizza-attribute">
                <div className="attribute-heading">Cheese</div>
                {expanded ?
                    <div className="attribute-options">
                        {options.map((value, i) =>
                            <div
                                key={i}
                                className={`attribute-option${value == currentValue ? ' selected' : ''}`}
                                onClick={() => this.setValue(value)}
                            >
                                {value}
                            </div>
                        )}
                    </div>
                    : <div 
                        className="attribute-option selected"
                        onClick={() => this.setState({ expanded: true})}
                    >
                        {currentValue}
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentValue: state.centerColumn.pizzaBuilder.get('cheese')
});

const mapDispatchToProps = dispatch => ({
    changeValue: value => dispatch(changeCheese(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheeseSelection)
