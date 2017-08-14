import React from 'react';
import PropTypes from 'prop-types';

import { parseId } from 'common/utils';

import CenterColumn from '../ui/columns/CenterColumn';
import MyOrderPanel from '../ui/panels/MyOrderPanel';

const OrderDetails = ({ id }) => (
  <CenterColumn>
    <MyOrderPanel id={id} />
  </CenterColumn>
);

OrderDetails.propTypes = { id: PropTypes.number.isRequired };

export default parseId(OrderDetails);
