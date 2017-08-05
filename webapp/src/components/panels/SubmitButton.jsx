import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ text, data, onSubmit }) => (
  <button className="button" onClick={() => onSubmit(data)}>{text}</button>
);

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onSubmit: PropTypes.func.isRequired,
};

export default SubmitButton;
