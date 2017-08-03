import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { parseId } from 'common/utils';

import { currentOrderSelectors } from 'data/currentOrder';

import CenterColumn from './CenterColumn';
import MenuPanel from '../panels/menu/MenuPanel';
import CurrentOrderPanel from '../panels/currentOrder/CurrentOrderPanel';
import PizzaBuilderPanel from '../panels/pizzaBuilder/PizzaBuilderPanel';
import NewGroupOptionsPanel from '../panels/orderOptions/NewGroupOptionsPanel';
import NewOrderConfirmPanel from '../panels/orderOptions/NewOrderConfirmPanel';
import { getGroupRestaurantId } from '../../selectors';

const Order = ({ mode, stage, menuId, id }) => {
  switch (stage) {
    case 'choose': return (
      <CenterColumn>
        <MenuPanel id={menuId} viewOnly={false} />
        <CurrentOrderPanel />
      </CenterColumn>
    );

    case 'confirm': return (
      <CenterColumn>
        <CurrentOrderPanel />
        {mode === 'join' ?
          <NewOrderConfirmPanel id={id} />
          :
          <NewGroupOptionsPanel mode={mode} id={id} />
        }
      </CenterColumn>
    );

    case 'pizza': return (
      <CenterColumn>
        <PizzaBuilderPanel id={menuId} />
      </CenterColumn>
    );

    default: return null;
  }
};

Order.propTypes = {
  mode: PropTypes.oneOf(['start', 'join', 'activate']).isRequired,
  stage: PropTypes.oneOf(['choose', 'confirm', 'pizza']).isRequired,
  menuId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

const { getCurrentOrderStage } = currentOrderSelectors;

const mapStateToProps = (state, { route: { path }, id }) => {
  const mode = path.split('/')[0];
  return {
    mode,
    stage: getCurrentOrderStage(state),
    menuId: mode === 'start' ? id : getGroupRestaurantId(state, id),
  };
};

export default parseId(connect(
  mapStateToProps,
)(Order));
