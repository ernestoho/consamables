import '../styles/column.scss';

import React from 'react';
import { connect } from 'react-redux';

import RestaurantPanel from './panels/restaurant/RestaurantPanel';
import CredentialsPanel from './panels/credentials/CredentialsPanel';

class RightColumn extends React.Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <div className="column-right">
        <RestaurantPanel/>
        {loggedIn ?
          <CredentialsPanel/>
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.currentUser.get('loggedIn')
});

export default connect(
  mapStateToProps
)(RightColumn);
