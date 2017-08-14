import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import CenterColumn from '../ui/columns/CenterColumn';
import MenuPanel from '../ui/panels/MenuPanel';

const Menu = ({ id }) => (
  <CenterColumn>
    <MenuPanel id={id} viewOnly />
  </CenterColumn>
);

Menu.propTypes = { id: PropTypes.number.isRequired };

export default parseId(Menu);
