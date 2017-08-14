import React from 'react';
import PropTypes from 'prop-types';

import Title from './Title';

import '../column.scss';

const CenterColumn = ({ children }) => (
  <div className="column-center">
    <Title />
    {children}
  </div>
);

CenterColumn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenterColumn;
