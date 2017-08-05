import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { toJS } from 'common/utils';

import { groupSelectors } from 'data/groups';

import PanelHeader from '../../PanelHeader';
import ActiveOrderBox from './ActiveOrderBox';
import ActiveOrderEmptyText from './ActiveOrderEmptyText';

import '../../../../styles/panels/active-order-panel.scss';

const ActiveOrderPanel = ({ groups }) => (
  <div className="active-order-panel">
    <PanelHeader name="Active Orders" />
    {groups.length ?
      <div className="scrollable">
        {groups.map(result => <ActiveOrderBox key={result.groupId} {...result} />)}
      </div>
      :
      <ActiveOrderEmptyText />
    }
  </div>
);

ActiveOrderPanel.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    restaurantId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    orders: PropTypes.number.isRequired,
    timeStarted: PropTypes.number.isRequired,
    durationMinutes: PropTypes.number.isRequired,
  })).isRequired,
};

const { getVisibleActiveGroups } = groupSelectors;

const mapStateToProps = state => ({
  groups: getVisibleActiveGroups(state, moment()),
});

export default connect(
  mapStateToProps,
)(toJS(ActiveOrderPanel));
