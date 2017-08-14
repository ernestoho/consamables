import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import CenterColumn from '../ui/columns/CenterColumn';
import VotingPanel from '../ui/panels/VotingPanel';

const Vote = ({ id }) => (
  <CenterColumn>
    <VotingPanel id={id} />
  </CenterColumn>
);

Vote.propTypes = { id: PropTypes.number.isRequired };

export default parseId(Vote);
