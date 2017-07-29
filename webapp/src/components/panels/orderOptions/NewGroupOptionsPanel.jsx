import '../../../styles/panels/new-group-options-panel';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import OrderTypePreference from './OrderTypePreference';
import OrderDurationPreference from './OrderDurationPreference';
import OverheadPreference from './OverheadPreference';
import SubmitNewGroup from './SubmitNewGroup';
import SubmitActivatedGroup from './SubmitActivatedGroup';
import Spinner from '../Spinner';

class NewGroupOptionsPanel extends React.Component {
  render() {
    const { loading, mode, id } = this.props;

    return (
      <div className="new-group-options-panel">
        <PanelHeader name="Order Options"/>
        <div className="order-options">
          <OrderTypePreference/>
          <OrderDurationPreference/>
          <OverheadPreference/>
        </div>
        {loading ?
          <Spinner/>
          : (mode == 'start' ?
            <SubmitNewGroup id={id}/>
            : <SubmitActivatedGroup id={id}/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.centerColumn.currentOrder.get('loading')
});

export default connect(
  mapStateToProps
)(NewGroupOptionsPanel);
