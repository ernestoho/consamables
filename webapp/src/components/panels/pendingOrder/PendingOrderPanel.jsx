import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { groupSelectors } from 'data/groups';

import PanelHeader from '../PanelHeader';
import PendingOrderBox from './PendingOrderBox';

import '../../../styles/panels/pending-order-panel.scss';

const PendingOrderPanel = ({ groups }) => (
  <div className="pending-order-panel">
    <PanelHeader name="Pending Orders" />
    {groups.length > 0 ?
      <div className="scrollable">
        {groups.map(group => <PendingOrderBox key={group.groupId} {...group} />)}
      </div>
      :
      <div className="empty-text-container">
        <div className="empty-text">
          No pending orders right now!
        </div>
        <div className="empty-text">
          Feel free to suggest one of your own.
        </div>
      </div>}
  </div>
);

PendingOrderPanel.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    restaurantName: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    minPeople: PropTypes.number.isRequired,
    hasVoted: PropTypes.bool.isRequired,
  })).isRequired,
};

const { getPendingGroups } = groupSelectors;

const mapStateToProps = state => ({
  groups: getPendingGroups(state),
});

export default connect(
  mapStateToProps,
)(toJS(PendingOrderPanel));
