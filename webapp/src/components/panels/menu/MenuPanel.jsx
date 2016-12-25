import '../../../styles/panels/menu-panel.scss';

import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '../PanelHeader';
import MenuSection from './MenuSection';
import MenuCloseButton from './MenuCloseButton';
import { getRestaurantName, getMenu } from '../../../selectors';

class MenuPanel extends React.Component {
    render() {
        return (
            <div className="menu-panel">
                <div className="menu-header">
                    <MenuCloseButton/>
                    <div className="menu-name">{`${this.props.name} Menu`}</div>
                </div>
                <div className="scrollable">
                    {this.props.menu.map(section =>
                        <MenuSection
                            key={section.get('menuSectionId')}
                            name={section.get('name')}
                            items={section.get('items')}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: getRestaurantName(state, state.centerColumn.get('menuId')),
    menu: getMenu(state, state.centerColumn.get('menuId'))
});

export default connect(
    mapStateToProps
)(MenuPanel)
