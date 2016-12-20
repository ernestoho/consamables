import '../../../styles/panels/restaurant-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import PanelHeader from '../PanelHeader';
import RestaurantBox from './RestaurantBox';
import { showModal } from '../../../actions';

class RestaurantPanel extends React.Component {
    render() {
        return (
            <div className="restaurant-panel">
                <PanelHeader name="Restaurants Nearby"></PanelHeader>
                {this.props.restaurants.map(result =>
                    <RestaurantBox
                        key={result.get('restaurantId')}
                        {...result.toJS()}
                        onStartClick={this.props.onStartClick}
                    />
                )}
            </div>
        );
    }
}


const mapStateToProps = state => ({restaurants: state.restaurants.toList()});

const mapDispatchToProps = dispatch => {
    return {
        onStartClick: () => dispatch(showModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantPanel)
