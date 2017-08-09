import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { groupSelectors } from 'data/groups';

import PanelHeader from '../PanelHeader';
import OrganizedOrderPreview from './OrganizedOrderPreview';

import '../../../styles/panels/organized-order-summary.scss';

const OrganizedOrderSummary = ({ groups }) => (
  <div className="organized-order-summary">
    <PanelHeader name="Groups You're Ordering For" />
    {groups.map(group => <OrganizedOrderPreview key={group.groupId} {...group} />)}
  </div>
);

OrganizedOrderSummary.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    restaurantName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    timeStarted: PropTypes.number.isRequired,
    durationMinutes: PropTypes.number.isRequired,
  })).isRequired,
};

const { getOrganizedGroupSummary } = groupSelectors;

const mapStateToProps = state => ({
  groups: getOrganizedGroupSummary(state),
});

export default connect(
  mapStateToProps,
)(toJS(OrganizedOrderSummary));
