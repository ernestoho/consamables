import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { groupSelectors } from 'data/groups';

import CenterColumn from './CenterColumn';
import Helper from '../Helper';
import MyOrderSummary from '../panels/myOrder/MyOrderSummary';
import OrganizedOrderSummary from '../panels/organizedOrder/OrganizedOrderSummary';

const Dashboard = ({ hasJoinedGroup, hasOrganizedGroup }) => (
  <CenterColumn>
    {hasJoinedGroup ?
      <MyOrderSummary />
      : null}
    <Helper />
    {hasOrganizedGroup ?
      <OrganizedOrderSummary />
      : null}
  </CenterColumn>
);

Dashboard.propTypes = {
  hasJoinedGroup: PropTypes.bool.isRequired,
  hasOrganizedGroup: PropTypes.bool.isRequired,
};

const { hasUserJoinedGroup, hasUserOrganizedGroup } = groupSelectors;

const mapStateToProps = state => ({
  hasJoinedGroup: hasUserJoinedGroup(state),
  hasOrganizedGroup: hasUserOrganizedGroup(state),
});

export default connect(
  mapStateToProps,
)(Dashboard);
