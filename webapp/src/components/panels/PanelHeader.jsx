import React from 'react';
import PropTypes from 'prop-types';

const PanelHeader = ({ name }) => (
  <div className="panel-header">{name}</div>
);

PanelHeader.propTypes = { name: PropTypes.string.isRequired };

export default PanelHeader;
