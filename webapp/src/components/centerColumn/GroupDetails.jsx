import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import CenterColumn from './CenterColumn';
import OrganizedOrderPanel from '../panels/organizedOrder/OrganizedOrderPanel';

const GroupDetails = ({ id }) => (
  <CenterColumn>
    <OrganizedOrderPanel id={id} />
  </CenterColumn>
);

GroupDetails.propTypes = { id: PropTypes.number.isRequired };

export default parseId(GroupDetails);
