import React from 'react';
import PropTypes from 'prop-types';

class PizzaAttributeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  setValue(value) {
    this.setState({ expanded: false });
    this.props.changeValue(value);
  }

  render() {
    const { name, options, currentValue } = this.props;
    const { expanded } = this.state;

    return (
      <div className="pizza-attribute">
        <div className="attribute-heading">{name}</div>
        {expanded ?
          <div className="attribute-options">
            {options.map(value => (
              <div
                key={value}
                className={`attribute-option${value === currentValue ? ' selected' : ''}`}
                onClick={() => this.setValue(value)}
              >
                {value}
              </div>
            ))}
          </div>
          : <div
            className="attribute-option selected"
            onClick={() => this.setState({ expanded: true })}
          >
            {currentValue}
          </div>}
      </div>
    );
  }
}

PizzaAttributeSelection.propTypes = {
  name: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeValue: PropTypes.func.isRequired,
};

export default PizzaAttributeSelection;
