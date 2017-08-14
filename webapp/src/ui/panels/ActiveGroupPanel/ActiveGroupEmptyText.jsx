import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { groupSelectors } from 'data/groups';

const ActiveGroupEmptyText = ({ anyPendingGroups, anyOrganizedGroups }) => (
  anyOrganizedGroups ?
    <div className="empty-text-container">
      <div className="empty-text">No one else is ordering!</div>
    </div>
    :
    <div className="empty-text-container">
      <div className="empty-text">
        No one&apos;s ordering right now!
      </div>
      <div className="empty-text">
        {anyPendingGroups ? 'Join a pending order ' : 'Suggest an order '}
        or start one of your own.
      </div>
    </div>
);

ActiveGroupEmptyText.propTypes = {
  anyPendingGroups: PropTypes.bool.isRequired,
  anyOrganizedGroups: PropTypes.bool.isRequired,
};

const { anyPendingGroups, anyOrganizedGroups } = groupSelectors;

const mapStateToProps = state => ({
  anyPendingGroups: anyPendingGroups(state),
  anyOrganizedGroups: anyOrganizedGroups(state),
});

export default connect(mapStateToProps)(ActiveGroupEmptyText);
