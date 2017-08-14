import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import CenterColumn from '../ui/columns/CenterColumn';
import SuggestionPanel from '../ui/panels/SuggestionPanel';

const Suggest = ({ id }) => (
  <CenterColumn>
    <SuggestionPanel id={id} />
  </CenterColumn>
);

Suggest.propTypes = { id: PropTypes.number.isRequired };

export default parseId(Suggest);
