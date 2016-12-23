import '../styles/column.scss'

import React from 'react';
import { connect } from 'react-redux';

import Title from './Title';
import Helper from './Helper';
import YourOrderPanel from './panels/yourOrder/YourOrderPanel';
import MenuPanel from './panels/menu/MenuPanel';
import { DISPLAY_DEFAULT, DISPLAY_MENU } from '../constants';

class CenterColumn extends React.Component {
    render() {
        switch(this.props.display) {
            case DISPLAY_MENU:
                return (
                    <div className="column-center">
                        <Title/>
                        <MenuPanel id={this.props.menuId}/>
                    </div>
                );
            default:
                return (
                    <div className="column-center">
                        <Title/>
                        <div className="padding"></div>
                        <Helper/>
                    </div>
                );
        }
    }
}

const mapStateToProps = state => ({
    display: state.centerColumn.get('display'),
    menuId: state.centerColumn.get('menuId')
});

export default connect(
    mapStateToProps
)(CenterColumn)
