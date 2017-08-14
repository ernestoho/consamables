import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ url }) => (
  <div className="link" onClick={() => { window.open(`http://${url}`); }}>
    {url.startsWith('www.') ? url.slice(4) : url}
  </div>
);

Link.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Link;
