import { connect } from 'react-redux';

import CloseButton from '../CloseButton';
import { closeSuggestOrder } from '../../../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(closeSuggestOrder())
});

const SuggestCloseButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(CloseButton);

export default SuggestCloseButton
