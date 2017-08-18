import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { toJS } from 'common/utils';

import { groupSelectors } from 'data/groups';

import { PanelHeader } from 'common/components';
import ActiveGroupBox from './ActiveGroupBox';
import ActiveGroupEmptyText from './ActiveGroupEmptyText';

import './styles.scss';

const ActiveGroupPanel = ({ groups }) => (
  <div className="active-group-panel">
    <PanelHeader name="Active Orders" />
    {groups.length ?
      <div className="scrollable">
        {groups.map(result => <ActiveGroupBox key={result.groupId} {...result} />)}
      </div>
      :
      <ActiveGroupEmptyText />
    }
  </div>
);

ActiveGroupPanel.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    restaurantId: PropTypes.number.isRequired,
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
)(toJS(ActiveGroupPanel));
