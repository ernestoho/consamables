import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import CenterColumn from '../ui/columns/CenterColumn';
import OrganizedGroupPanel from '../ui/panels/OrganizedGroupPanel';

const GroupDetails = ({ id }) => (
  <CenterColumn>
    <OrganizedGroupPanel id={id} />
  </CenterColumn>
);

GroupDetails.propTypes = { id: PropTypes.number.isRequired };

export default parseId(GroupDetails);
