import { connect } from 'react-redux';

import CloseButton from '../CloseButton';
import { hideGroupDetails } from '../../../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(hideGroupDetails())
});

const GroupDetailsCloseButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(CloseButton)

export default GroupDetailsCloseButton
