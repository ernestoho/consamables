import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toJS } from 'common/utils';

import { groupSelectors } from 'data/groups';

import { PanelHeader } from 'common/components';
import OrganizedGroupPreview from './OrganizedGroupPreview';

import './styles.scss';

const OrganizedGroupSummary = ({ groups }) => (
  <div className="organized-group-summary">
    <PanelHeader name="Groups You're Ordering For" />
    {groups.map(group => <OrganizedGroupPreview key={group.groupId} {...group} />)}
  </div>
);

OrganizedGroupSummary.propTypes = {
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
)(toJS(OrganizedGroupSummary));
