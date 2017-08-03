import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import CenterColumn from './CenterColumn';
import SuggestOrderPanel from '../panels/suggestOrder/SuggestOrderPanel';

const Suggest = ({ id }) => (
  <CenterColumn>
    <SuggestOrderPanel id={id} />
  </CenterColumn>
);

Suggest.propTypes = { id: PropTypes.number.isRequired };

export default parseId(Suggest);
