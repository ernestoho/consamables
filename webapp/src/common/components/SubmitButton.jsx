import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ text, onSubmit }) => (
  <button className="button" onClick={onSubmit}>{text}</button>
);

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SubmitButton;
