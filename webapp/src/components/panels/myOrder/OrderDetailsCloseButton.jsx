import { connect } from 'react-redux';

import CloseButton from '../CloseButton';
import { hideOrderDetails } from '../../../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(hideOrderDetails())
});

const OrderDetailsCloseButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(CloseButton)

export default OrderDetailsCloseButton
