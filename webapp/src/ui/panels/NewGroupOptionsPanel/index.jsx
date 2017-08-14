import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currentOrderSelectors } from 'data/currentOrder';

import { PanelHeader, Spinner } from 'common/components';
import OrderTypePreference from './OrderTypePreference';
import OrderDurationPreference from './OrderDurationPreference';
import OverheadPreference from './OverheadPreference';
import SubmitNewGroup from './SubmitNewGroup';
import SubmitActivatedGroup from './SubmitActivatedGroup';

import './styles.scss';

const NewGroupOptionsPanel = ({ loading, mode, id }) => {
  const SubmitGroup = () => (mode === 'start' ?
    <SubmitNewGroup id={id} />
    : <SubmitActivatedGroup id={id} />);

  return (
    <div className="new-group-options-panel">
      <PanelHeader name="Order Options" />
      <div className="order-options">
        <OrderTypePreference />
        <OrderDurationPreference />
        <OverheadPreference />
      </div>
      {loading ? <Spinner /> : <SubmitGroup />}
    </div>
  );
};

NewGroupOptionsPanel.propTypes = ({
  loading: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});

const { isLoading } = currentOrderSelectors;

const mapStateToProps = state => ({
  loading: isLoading(state),
});

export default connect(
  mapStateToProps,
)(NewGroupOptionsPanel);
