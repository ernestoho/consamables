import '../../../styles/panels/restaurant-panel.scss';

import React from 'react';
import { connect } from 'react-redux';
import PanelHeader from '../PanelHeader';
import RestaurantBox from './RestaurantBox';
import { showModal, showMenu } from '../../../actions';

class RestaurantPanel extends React.Component {
    render() {
        const {
            restaurants,
            onMenuClick, onStartClick
        } = this.props;

        return (
            <div className="restaurant-panel">
                <PanelHeader name="Restaurants Nearby"></PanelHeader>
                {restaurants.map(result =>
                    <RestaurantBox
                        key={result.get('restaurantId')}
                        {...result.toJS()}
                        onMenuClick={() => onMenuClick(result.get('restaurantId'))}
                        onStartClick={onStartClick}
                    />
                )}
            </div>
        );
    }
}


const mapStateToProps = state => ({restaurants: state.restaurants.toList()});

const mapDispatchToProps = dispatch => {
    return {
        onMenuClick: (id) => dispatch(showMenu(id)),
        onStartClick: () => dispatch(showModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantPanel)
