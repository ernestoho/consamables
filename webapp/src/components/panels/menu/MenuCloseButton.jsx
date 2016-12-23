import { connect } from 'react-redux';

import CloseButton from '../CloseButton';
import { hideMenu } from '../../../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        onClick: () => dispatch(hideMenu())
    }
};

const MenuCloseButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(CloseButton);

export default MenuCloseButton
