import React from 'react';
import { connect } from 'react-redux';

import LeftColumn from './LeftColumn';
import CenterColumn from './CenterColumn';
import RightColumn from './RightColumn';
import Modal from './Modal';
import { fetchRestaurants, fetchPendingOrders } from '../actions';

class App extends React.Component {
    componentDidMount() {
        this.props.loadRestaurants();
        this.props.loadPendingOrders();
    }

    render() {
        return (
            <div>
                <LeftColumn/>
                <CenterColumn/>
                <RightColumn/>
                <Modal/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    loadRestaurants: () => dispatch(fetchRestaurants()),
    loadPendingOrders: () => dispatch(fetchPendingOrders())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
