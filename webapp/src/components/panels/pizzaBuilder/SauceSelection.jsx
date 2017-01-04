import React from 'react';
import { connect } from 'react-redux';

import { changeSauce } from '../../../actions';

class SauceSelection extends React.Component {
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
                <div className="attribute-heading">Sauce</div>
                {expanded ?
                    <div className="attribute-options">
                        {options.map((value, i) =>
                            <div
                                key={i}
                                className={value == currentValue ? 'attribute-option-selected' : 'attribute-option'}
                                onClick={() => this.setValue(value)}
                            >
                                {value}
                            </div>
                        )}
                    </div>
                    : <div 
                        className="attribute-option-selected"
                        onClick={() => this.setState({ expanded: true})}
                    >
                        {currentValue}
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentValue: state.centerColumn.pizzaBuilder.get('sauce')
});

const mapDispatchToProps = dispatch => ({
    changeValue: value => dispatch(changeSauce(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SauceSelection)
