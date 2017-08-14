import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Helper = () => (
  <div className="helper">
    <HelperText className="left-helper" text="Join an existing group" />
    <HelperText className="right-helper" text="Explore other options" />
  </div>
);

const HelperText = ({ className, text }) => (
  <div className={className}>
    <div className="helper-text">{text}</div>
    <div className="arrows">
      <div className="left-arrow">▼</div>
      <div className="right-arrow">▼</div>
    </div>
  </div>
);

HelperText.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Helper;
